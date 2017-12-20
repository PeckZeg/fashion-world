require('../../utils/global-mixins');

const debug = require('debug')('migrate');

const isArray = require('lodash/isArray');
const repeat = require('lodash/repeat');
const map = require('lodash/map');

const initPendingList = require('./initPendingList');
const createClient = require('redis/createClient');
const migrateImage = require('./migrateImage');
const migrateVideo = require('./migrateVideo');

const DefinitionVideo = require('models/DefinitionVideo');
const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async () => {
  const client = createClient();

  try {
    await initPendingList();

    let videoId;

    while (videoId = await client.spopAsync(PENDING_LIST)) {
      const space = repeat(' ', 2);

      try {
        if (await client.sismemberAsync(COMPLETE_LIST, videoId)) {
          debug(`忽略视频 ${videoId} ，原因：已转换`);
          continue;
        }

        debug(`即将处理视频 ${videoId}`);

        let video = await Video.findById(videoId);
        let source = await SourceVideo.findById(video.sourceId);

        debug(`${space}正在迁移封面`);
        const cover = await migrateImage(video.cover);
        debug(`${space}完成迁移封面`);

        debug(`${space}正在迁移截图`);
        let screenshots = [];

        if (isArray(source.screenshots)) {
          for (let screenshot of source.screenshots) {
            try {
              screenshots.push(await migrateImage(screenshot));
            }

            catch (err) {
              // ...
            }
          }
        }
        debug(`${space}完成迁移截图，共计 ${screenshots.length} 张`);

        debug(`${space}正在迁移视频`);
        const definitions = await migrateVideo(video);
        debug(`${space}完成迁移视频，共计 ${definitions.length} 个`);

        const doc = {
          $set: {
            cover,
            screenshots,
            definitions
          }
        };

        video = await Video.findByIdAndUpdate(video._id, doc, { new: true });

        await client.saddAsync(COMPLETE_LIST, videoId.toString());
        debug(`💠${space}处理视频 ${videoId} 成功`);
      }

      catch (err) {
        await client.saddAsync(ERROR_LIST, videoId.toString());
        debug(`🤢${space}处理视频 ${videoId} 失败`);
        console.error(err);
      }

      const pendingCount = await client.scardAsync(PENDING_LIST);
      const completeCount = await client.scardAsync(COMPLETE_LIST);
      const errorCount = await client.scardAsync(ERROR_LIST);

      debug(`💩${space}已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
    }

    await client.quitAsync();
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

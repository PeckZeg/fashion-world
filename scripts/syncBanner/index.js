require('../../utils/global-mixins');

const debug = require('debug')('sync');
const path = require('path');

const initPendingList = require('./initPendingList');
const createClient = require('redis/createClient');
const uploadImage = require('./uploadImage');

const Banner = require('models/Banner');

const { ObjectId } = require('mongoose').Types;
const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async function() {
  try {
    const client = createClient();
    const pendingTotal = await initPendingList();

    if (pendingTotal) {
      let confJSON;

      debug(`🐧  需要同步 ${pendingTotal} 个横幅栏`);

      while (confJSON = await client.spopAsync(PENDING_LIST)) {
        const conf = JSON.parse(confJSON);
        const basename = path.basename(conf.file);

        try {
          if (await client.sismemberAsync(COMPLETE_LIST, confJSON)) {
            debug(`🧟‍  同步 ${basename} 失败，原因：已转换`);
            continue;
          }

          const bannerCount = await Banner.count({
            channelId: conf.channelId,
            categoryId: conf.categoryId,
            title: conf.title
          });

          if (bannerCount) {
            await client.saddAsync(COMPLETE_LIST, confJSON);
            debug(`🧟‍  同步 ${basename} 失败，原因：已存在`);
            continue;
          }

          debug(`正在同步横幅栏 ${basename}`);

          const cover = await uploadImage(conf.file);
          const { channelId, categoryId, title, videoId } = conf;
          const banner = new Banner({
            channelId,
            categoryId,
            type: 'GOTO_VIDEO_PROFILE',
            title,
            cover,
            publishAt: new Date(),
            value: {
              videoId: videoId ? ObjectId(videoId) : null
            }
          });

          await banner.save();
          await client.saddAsync(COMPLETE_LIST, confJSON);
          debug(`🗿  同步横幅栏 ${basename} 成功`);
        }

        catch (err) {
          await client.saddAsync(ERROR_LIST, confJSON);
          debug(`🤢  同步横幅栏 ${basename} 失败`);
          console.error(err);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩  已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }

    else {
      debug('🤟  没有需要同步的横幅栏');
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

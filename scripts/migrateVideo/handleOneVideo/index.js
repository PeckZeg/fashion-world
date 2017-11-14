const debug = require('debug')('migrate');
const path = require('path');

const cacheKey = require('../keys/migratedVideoList');
const migrateImage = require('../utils/migrateImage');
const migrateVideo = require('../utils/migrateVideo');
const createClient = require('redis/createClient');
const syncUtils = require('../../utils');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

module.exports = async (videoId) => {
  const client = createClient();
  const key = cacheKey();

  if (!client.sismember(key, videoId)) {
    debug(`即将处理视频 ${videoId}`);

    let video = await Video.findById(videoId);

    debug(`  正在迁移封面`);
    const cover = await migrateImage(
      video.cover || ''
    );
    debug(`  完成迁移封面`);

    const source = await SourceVideo.findById(video.sourceId);
    const { filepath } = source;

    debug(`  正在迁移截图`);
    let screenshots = [];
    for (let [idx, screenshot] of source.screenshots.entries()) {
      screenshots.push(await migrateImage(screenshot || ''));
    }
    debug(`  完成迁移截图`);


    debug(`  正在迁移视频`);
    const sourceKey = await migrateVideo(source.filepath);
    debug(`  完成迁移视频`);

    const doc = {
      $set: {
        cover,
        screenshots,
        source: sourceKey,
        filepath
      }
    };
    const opts = { new: true };

    video = await Video.findByIdAndUpdate(videoId, doc, opts);

    console.log({videoId});
  }

  else {
    debug(`跳过视频 ${videoId} 的处理`);
  }

  await client.quitAsync();
};

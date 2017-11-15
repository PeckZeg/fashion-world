const debug = require('debug')('migrate');
const qiniu = require('qiniu');
const path = require('path');

const fetchPublicUrl = require('utils/ip/fetchPublicUrl');
const createConfig = require('utils/qiniu/createConfig');
const createMac = require('utils/qiniu/createMac');

const cacheKey = require('../keys/migratedVideoList');
const migrateImage = require('../utils/migrateImage');
const migrateVideo = require('../utils/migrateVideo');
const createClient = require('redis/createClient');
const genFops = require('../utils/genFops');
const syncUtils = require('../../utils');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { videos: bucket } = config.qiniu.bucket;

module.exports = async (videoId) => {
  const client = createClient();
  const key = cacheKey();

  if (!await client.sismemberAsync(key, videoId)) {
    debug(`即将处理视频 ${videoId}`);

    let video = await Video.findById(videoId);

    debug(`  正在迁移封面`);
    const cover = await migrateImage(
      video.cover || ''
    );
    debug(`  完成迁移封面`);

    const source = await SourceVideo.findById(video.sourceId);
    let { filepath = '' } = source;
    filepath = filepath.replace(/^\/WineLife_Channel_1080P/, '/WLC');

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
    let opts = { new: true };

    // video = await Video.findByIdAndUpdate(videoId, doc, opts);

    debug('  正在生成清晰度转换队列');
    const mac = createMac();
    const conf = createConfig();
    const operManager = new qiniu.fop.OperationManager(mac, config);
    const fops = await genFops('videos', sourceKey);
    const pipeline = 'video';
    opts = {
      notifyURL: await fetchPublicUrl('/api/video/qiniu'),
      force: true
    };
    await operManager.pfopAsync(bucket, sourceKey, fops, pipeline, opts);
    debug('  完成生成清晰度转换队列');

    await client.saddAsync(key, videoId);
  }

  else {
    debug(`跳过视频 ${videoId} 的处理`);
  }

  await client.quitAsync();
};

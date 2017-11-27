const debug = require('debug')('migrate');
const qiniu = require('qiniu');
const path = require('path');

const repeat = require('lodash/repeat');

const fetchPublicUrl = require('utils/ip/fetchPublicUrl');
const createConfig = require('utils/qiniu/createConfig');
const createMac = require('utils/qiniu/createMac');
const createClient = require('redis/createClient');
const migrateSource = require('./migrateSource');
const migrateImage = require('./migrateImage');
const genFops = require('./genFops');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { videos: bucket } = config.qiniu.bucket;

module.exports = async videoId => {
  try {
    const client = createClient();
    let space = repeat(' ', 2);

    debug(`即将处理视频 ${videoId}`);

    let video = await Video.findById(videoId);

    debug(`${space}正在迁移封面`);
    const cover = await migrateImage(video.cover);
    debug(`${space}完成迁移封面`);

    const source = await SourceVideo.findById(video.sourceId);

    debug(`${space}正在迁移截图`);
    let screenshots = [];
    for (let screenshot of source.screenshots) {
      screenshots.push(await migrateImage(screenshot));
    }
    debug(`${space}完成迁移截图`);

    debug(`${space}正在迁移视频`);
    let { filepath = '' } = source;
    filepath = filepath.replace(/^\/WineLife_Channel_1080P/, '/WLC');
    const sourceKey = await migrateSource(filepath);
    debug(`${space}完成迁移视频`);

    debug(`${space}正在生成清晰度转换队列`);
    const mac = createMac();
    const conf = createConfig();
    const operManager = new qiniu.fop.OperationManager(mac, config);
    const fops = await genFops('videos', sourceKey);
    const pipeline = 'video';
    const opts = {
      notifyURL: await fetchPublicUrl('/api/video/qiniu'),
      force: true
    };
    await operManager.pfopAsync(bucket, sourceKey, fops, pipeline, opts);
    debug(`${space}完成生成清晰度转换队列`);

    const doc = {
      $set: {
        cover,
        screenshots,
        source: sourceKey,
        filepath
      }
    };

    video = await Video.findByIdAndUpdate(videoId, doc, { new: true });

    const cacheKey = require('scripts/migrateVideo/keys/completeList');

    await client.saddAsync(cacheKey, videoId);
    await client.quitAsync();
  }

  catch (err) {
    console.error(err);

    const cacheKey = require('scripts/migrateVideo/keys/videoList');
    const client = createClient();

    await client.saddAsync(cacheKey, videoId);
    await client.quitAsync();

    debug(`迁移视频 ${videoId} 发生错误`);

    // process.exit(1);
  }
};

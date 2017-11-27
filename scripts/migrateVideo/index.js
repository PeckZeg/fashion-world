const debug = require('debug')('migrate');

const globalMixins = require('../../utils/global-mixins');

const createClient = require('redis/createClient');
const handleOneVideo = require('./handleOneVideo');
const checkComplete = require('./checkComplete');
const initSyncList = require('./initSyncList');
const cacheKey = require('./keys/videoList');

(async () => {
  const client = createClient();
  let videoId;

  await initSyncList();

  while (videoId = await client.spopAsync(cacheKey)) {
    const isComplete = await checkComplete(videoId);

    if (!isComplete) {
      await handleOneVideo(videoId);
    }

    else {
      debug(`忽略视频 ${videoId} (已经转换过)`);
    }
  }

  process.exit(0);
})().catch(err => console.error(err));

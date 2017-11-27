const path = require('path');

const globalMixins = require('../../../../../utils/global-mixins');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const items = require('./items');
const { videos: bucket } = config.qiniu.bucket;

(async () => {
  try {
    const bucketManager = createBucketManager();
    const definitions = await Promise.all(items.map(async ({ key }) => {
      const sha1 = await fetchFileSha1('videos', key);
      const extname = path.extname(key);
      const definition = `${sha1}${extname}`;
      const [respBody, respInfo] = await bucketManager.moveAsync(bucket, key,
        bucket, definition, { force: true });

      if (respInfo.statusCode !== 200) {
        throw new ResponseError(respInfo.statusCode, respBody);
      }

      const avinfo = await fetchVideoInfo('videos', definition);
      const { height } = avinfo.streams[0];

      return { type: `${height}p`, source: definition };
    }));

    console.log(definitions);
  }

  catch (err) {
    console.error(err);
  }
})();

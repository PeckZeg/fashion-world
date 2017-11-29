const path = require('path');

const isEmpty = require('lodash/isEmpty');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');
const createClient = require('redis/createClient');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { successKey, errorKey } = require('scripts/migrateVideo/keys/qiniu');
const { videos: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  let { inputKey: source, items } = req.body;
  source = source + '';

  if (source) {
    try {
      const client = createClient();
      const exists = await client.hexists(successKey, source);

      if (!exists) {
        const bucketManager = createBucketManager();
        let video = await Video.findOne({ source });

        if (video) {
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

          const doc = { $set: { definitions } };
          const opts = { new: true };

          await Video.findByIdAndUpdate(video._id, doc, opts);
          await client.hsetAsync(successKey, source, JSON.stringify(req.body));
        }
      }

      await client.quitAsync();
    }

    catch (err) {
      const client = createClient();
      await client.hsetAsync(errorKey, source, JSON.stringify(req.body));
      await client.quitAsync();
    }
  }

  res.send({ message: 'ok' });
};

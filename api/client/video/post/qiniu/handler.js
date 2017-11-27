const path = require('path');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { videos: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const { inputKey, items } = req.body;
    const qiniuSha1 = path.basename(inputKey, path.extname(inputKey));
    const bucketManager = createBucketManager();
    let video = await Video.findOne({ qiniuSha1 });

    if (video) {
      const definitions = Promise.all(items.map(({ key }) => async () => {
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

      video = await Video.findByIdAndUpdate(video._id, doc, opts);
      video = video.toJSON();
    }

    console.log({video});

    res.send({ video });
  }

  catch (err) {
    handleError(err);
  }
};

const path = require('path');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');

const Video = require('models/Video');

const { videos: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const { inputKey: source, items } = req.body;
    const bucketManager = createBucketManager();
    // let { key } = items[0];

    let video = await Video.findOne({ source });

    if (video) {
      let $each = [];

      for (let item of items) {
        let { key } = item;

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

          $each.push({ type: `${height}p`, source: definition });
      }

      const doc = { $push: { definitions: { $each } } };
      const opts = { new: true };

      video = await Video.findByIdAndUpdate(video._id, doc, opts);
      video = video.toJSON();
    }

    else {
      const [respBody, respInfo] = await bucketManager.deleteAsync(bucket, key);

      if (respInfo.statusCode !== 200) {
        throw new ResponseError(respInfo.statusCode, respBody);
      }
    }

    res.send({ video });
  }

  catch (err) {
    handleError(res, err);
  }
};

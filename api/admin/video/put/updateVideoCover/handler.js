const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Video = require('models/Video');

const action = 'ADMIN_VIDEO_PUT_UPDATE_VIDEO_COVER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { videoId } = req.params;
    const { key } = req.body;
    let video = await Video.findById(videoId);

    if (!video) {
      throw new ResponseError(404, 'video not found');
    }

    const bucketManager = createBucketManager();
    const { mimeType } = await fetchStat(bucketManager, bucket, key);
    const extname = mimeExt(mimeType);
    const sha1 = await fetchFileSha1(key);
    const cover = `${sha1}${extname}`;

    await bucketManager.moveAsync(bucket, key, bucket, cover, { force: true });

    const doc = { $set: { cover } };
    const opts = { new: true };

    video = await injectVideo(
      await Video.findByIdAndUpdate(videoId, doc, opts),
      { handler: 'toObject' }
    );

    handleResult(res, { video }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

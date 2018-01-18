const assign = require('lodash/assign');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const action = 'ADMIN_LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO_COVER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { loopVideoId } = req.params;
    const { key } = req.body;
    let loopVideo = await LoopVideo.findById(loopVideoId);
    let cover = null;

    if (!loopVideo) {
      throw new ResponseError(404, 'loopVideo not found');
    }

    if (key) {
      const bucketManager = createBucketManager();
      const { mimeType } = await fetchStat(bucketManager, bucket, key);
      const extname = mimeExt(mimeType);
      const sha1 = await fetchFileSha1(key);
      cover = `${sha1}${extname}`;

      await bucketManager.moveAsync(bucket, key, bucket, cover, { force: true });
    }

    const doc = { $set: { cover } };
    const opts = { new: true };

    loopVideo = await LoopVideo.findByIdAndUpdate(loopVideoId, doc, opts);
    loopVideo = assign(
      loopVideo.toObject(),
      {
        video: await injectVideo(
          await Video.findById(loopVideo.videoId),
          { handler: 'toObject' }
        )
      }
    );

    handleResult(res, { loopVideo }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

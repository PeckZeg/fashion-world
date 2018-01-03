const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Video = require('models/Video');

const action = 'ADMIN_VIDEO_POST_RECOMMEND_VIDEO';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { videoId } = req.params;
    let video = await Video.findById(videoId, 'publishAt recommendAt');

    if (!video) {
      throw new ResponseError(404, 'video not found');
    }

    if (video.recommendAt) {
      throw new ResponseError(403, 'video has been recommended');
    }

    const { recommendAt = new Date() } = req.body;
    const doc = {
      $set: {
        ...!video.publishAt ? { publishAt: new Date() } : null,
        recommendAt
      }
    };
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

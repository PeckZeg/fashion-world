const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Video = require('models/Video');

const action = 'ADMIN_VIDEO_GET_FETCH_VIDEO_PROFILE';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { videoId } = req.params;
    let video = await Video.findById(videoId);

    if (!video) {
      throw new ResponseError(404, 'video not found');
    }

    video = await injectVideo(video, { handler: 'toObject' });

    handleResult(res, { video }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

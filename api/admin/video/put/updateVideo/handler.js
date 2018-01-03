const isEmpty = require('lodash/isEmpty');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Video = require('models/Video');

const action = 'ADMIN_VIDEO_PUT_UPDATE_VIDEO';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { videoId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };
    let video = await Video.findByIdAndUpdate(videoId, doc, opts);

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

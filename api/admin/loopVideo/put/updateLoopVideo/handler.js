const isEmpty = require('lodash/isEmpty');
const assign = require('lodash/assign');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const action = 'ADMIN_LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { loopVideoId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };
    let loopVideo = await LoopVideo.findByIdAndUpdate(loopVideoId, doc, opts);

    if (!loopVideo) {
      throw new ResponseError(404, 'loopVideo not found');
    }

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

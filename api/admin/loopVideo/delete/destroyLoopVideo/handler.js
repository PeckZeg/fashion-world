const assign = require('lodash/assign');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectVideo = require('utils/models/inject/video');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const action = 'ADMIN_LOOP_VIDEO_DEL_DESTROY_LOOP_VIDEO';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { loopVideoId } = req.params;
    let loopVideo = await LoopVideo.findById(loopVideoId, 'videoId removeAt');

    if (!loopVideo) {
      throw new ResponseError(404, 'loopVideo not found');
    }

    if (loopVideo.removeAt) {
      throw new ResponseError(403, 'loopVideo has been removed');
    }

    const doc = {
      $set: {
        publishAt: null,
        removeAt: new Date()
      }
    };
    const opts = { new: true };

    loopVideo = await LoopVideo.findByIdAndUpdate(loopVideoId, doc, opts);
    loopVideo = assign(
      loopVideo.toObject(),
      {
        video: await injectVideo(await Video.findById(loopVideo.videoId))
      }
    );

    handleResult(res, { loopVideo }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/loop-video');
const validateObjectId = reqlib('./utils/validate-objectid');
const validateBody = require('./validateBody');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = 'ADMIN_LOOP_VIDEO_PUT_UPDATE_LOOP_VIDEO';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // validate body
    .then(loopVideoId => (
      validateBody(req.body).then(body => ({ loopVideoId, body }))
    ))

    // update loop video
    .then(({ loopVideoId, body }) => (
      LoopVideo.findByIdAndUpdate(loopVideoId, { $set: body }, { new: true })
    ))

    // inject props
    .then(loopVideo => {
      if (!loopVideo) {
        return Promise.reject(
          new ResponseError(404, 'loop video not found')
        );
      }

      return injectProps(null, loopVideo, 'toObject');
    })

    .then(loopVideo => handleResult(res, { loopVideo }, log))
    .catch(err => handleError(res, err));
};

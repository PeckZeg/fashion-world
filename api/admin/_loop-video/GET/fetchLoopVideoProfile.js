const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/loop-video');
const validateObjectId = reqlib('./utils/validate-objectid');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = 'ADMIN_LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // query loop video doc
    .then(loopVideoId => LoopVideo.findById(loopVideoId))

    // ensure loop-video doc
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
const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/loop-video');
const validateObjectId = reqlib('./utils/validate-objectid');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = 'ADMIN_LOOP_VIDEO_DEL_DESTROY_LOOP_VIDEO';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // query loop video doc
    .then(loopVideoId => LoopVideo.findById(loopVideoId))

    // ensure loop video exists
    .then(loopVideo => {
      if (!loopVideo) {
        return Promise.reject(
          new ResponseError(404, 'loop video not found')
        );
      }

      if (loopVideo.removeAt) {
        return Promise.reject(
          new ResponseError(403, 'loop video has been destroyed')
        );
      }

      const doc = {
        $set: {
          publishAt: null,
          removeAt: new Date()
        }
      };

      return LoopVideo.findByIdAndUpdate(loopVideo._id, doc, { new: true });
    })

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => handleResult(res, { loopVideo }, log))
    .catch(err => handleError(res, err));
};

const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/loop-video');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = config.apiActions['admin:loop-video:post:recover-loop-video'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // query loop video doc
    .then(loopVideoId => LoopVideo.findById(loopVideoId))

    // ensure loop video exists
    .then(loopVideo => {
      if (!loopVideo) {
        return Promise.reject(new ResponseError(404, 'loop video not found'));
      }

      if (!loopVideo.removeAt) {
        return Promise.reject(new ResponseError(403, 'loop video has been recovered'));
      }

      const doc = {
        $set: {
          removeAt: null
        }
      };

      return LoopVideo.findByIdAndUpdate(loopVideo._id, doc, OPTS);
    })

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => res.send({ loopVideo }))
    .catch(err => handleError(res, err));
};

const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/loop-video');
const validateBody = require('./validateBody');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = config.apiActions['admin:loop-video:put:update-loop-video'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // validate body
    .then(loopVideoId => (
      validateBody(req.body).then(body => ({ loopVideoId, body }))
    ))

    // update loop video
    .then(({ loopVideoId, body }) => (
      LoopVideo.findByIdAndUpdate(loopVideoId, { $set: body }, OPTS)
    ))

    // inject props
    .then(loopVideo => {
      if (!loopVideo) {
        return Promise.reject(new ResponseError(404, 'loop video not found'));
      }

      return injectProps(null, loopVideo, 'toObject');
    })

    .then(loopVideo => res.send({ loopVideo }))
    .catch(err => handleError(res, err));
};

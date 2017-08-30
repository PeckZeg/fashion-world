const injectProps = reqlib('./utils/model-injector/loop-video');
const validateObjectId = reqlib('./utils/validate-objectid');
const authToken = reqlib('./utils/keys/account/auth-token');
const handleError = reqlib('./utils/response/handle-error');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = config.apiActions['admin:loop-video:get:fetch-loop-video-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `loopVideoId`
    .then(token => validateObjectId(req.params.loopVideoId))

    // query loop video doc
    .then(loopVideoId => LoopVideo.findById(loopVideoId))

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => res.send({ loopVideo }))
    .catch(err => handleError(res, err));
};

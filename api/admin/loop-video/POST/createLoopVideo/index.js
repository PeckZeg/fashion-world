const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectProps = reqlib('./utils/model-injector/loop-video');
const validateBody = require('./validateBody');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = config.apiActions['admin:loop-video:post:create-loop-video'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate body
    .then(token => validateBody(req.body))

    // generate loop video doc
    .then(body => new LoopVideo(body))

    // save doc
    .then(loopVideo => loopVideo.save())

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => res.send({ loopVideo }))
    .catch(err => handleError(res, err));
};

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/loop-video');
const validateBody = require('./validateBody');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = 'ADMIN_LOOP_VIDEO_POST_CREATE_LOOP_VIDEO';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate body
    .then(token => validateBody(req.body))

    // generate loop video doc
    .then(body => new LoopVideo(body))

    // save doc
    .then(loopVideo => loopVideo.save())

    // inject props
    .then(loopVideo => injectProps(null, loopVideo, 'toObject'))

    .then(loopVideo => handleResult(res, { loopVideo }, log))
    .catch(err => handleError(res, err));
};

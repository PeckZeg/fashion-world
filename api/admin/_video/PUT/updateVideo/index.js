const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectProps = reqlib('./utils/model-injector/video');
const validateBody = require('./validateBody');

const Video = reqlib('./models/Video');

const ACTION = 'ADMIN_VIDEO_PUT_UPDATE_VIDEO';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // validate body
    .then(videoId => (
      validateBody(req.body).then(body => ({ videoId, body }))
    ))

    // update doc
    .then(({ videoId, body }) => (
      Video.findByIdAndUpdate(videoId, { $set: body }, { new: true })
    ))

    // transform doc
    .then(video => {
      if (!video) {
        return Promise.reject(
          new ResponseError(404, 'video not found')
        );
      }

      return injectProps(null, video, 'toObject');
    })

    .then(video => handleResult(res, { video }, log))
    .catch(err => handleError(res, err));
};

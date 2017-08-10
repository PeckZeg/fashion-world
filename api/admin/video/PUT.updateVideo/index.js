const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');
const validateBody = require('./validateBody');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:put:update-video'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // validate body params
    .then(videoId => validateBody(req.body).then(body => ({ videoId, body })))

    // update video
    .then(({ videoId, body }) => (
      Video.findByIdAndUpdate(videoId, { $set: body }, OPTS)
    ))

    // ensure video exists
    .then(video => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return video;
    })

    // inject props
    .then(video => injectVideos(null, video, 'toObject'))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

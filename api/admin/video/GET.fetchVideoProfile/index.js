const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:get:fetch-video-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `videoId`
    .then(() => validateObjectId(req.params.videoId))

    // fetch video doc
    .then(videoId => Video.findById(videoId))

    // check video exists
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

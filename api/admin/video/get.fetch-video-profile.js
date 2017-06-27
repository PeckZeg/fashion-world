const auth = reqlib('./utils/access-keys/account/auth');
const Video = reqlib('./models/Video');
const validateObjectId = reqlib('./utils/validate-objectid');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['admin:video:get:fetch-profile'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION)

    // validate `videoId`
    .then(() => validateObjectId(req.params.videoId))

    // fetch video doc
    .then(id => Video.findById(id))

    // check video exists
    .then(video => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return video;
    })

    // inject video
    .then(injectVideos)
    .then(video => video[0])

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

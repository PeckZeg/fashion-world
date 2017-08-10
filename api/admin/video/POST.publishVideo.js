const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:post:publish-video'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // query video doc
    .then(videoId => Video.findById(videoId))

    // ensure video exists
    .then(video => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      if (video.publishAt) {
        return Promise.reject(new ResponseError(403, 'video has been published'));
      }

      const doc = {
        $set: {
          publishAt: new Date(),
          recommendAt: null,
          removeAt: null
        }
      };

      return Video.findByIdAndUpdate(video._id, doc, OPTS);
    })

    // inject props
    .then(video => injectVideos(null, video, 'toObject'))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

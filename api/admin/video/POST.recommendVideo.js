const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:post:recommend-video'];
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

      if (video.recommendAt) {
        return Promise.reject(new ResponseError(403, 'video has been recommended'));
      }

      let doc = {
        $set: {
          recommendAt: new Date()
        }
      };

      if (!video.publishAt) {
        doc.$set.publishAt = new Date();
      }

      return Video.findByIdAndUpdate(video._id, doc, OPTS);
    })

    // inject props
    .then(video => injectVideos(null, video, 'toObject'))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

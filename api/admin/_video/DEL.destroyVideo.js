const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['admin:video:delete:destroy-video'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `videoId`
    .then(token => validateObjectId(req.params.videoId))

    // update video doc
    .then(videoId => (
      Video.findByIdAndUpdate(videoId, {
        $set: {
          publishAt: null,
          recommendAt: null,
          removeAt: new Date()
        }
      }, OPTS)
    ))

    // ensure video exists
    .then(video => (
      video ? video : Promise.reject(
        new ResponseError(404, 'video not found')
      )
    ))

    // inject props
    .then(video => injectVideos(null, video, 'toObject'))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

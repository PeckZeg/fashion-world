const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/model-injector/video');
const transformQuery = reqlib('./utils/transform-query');
const authToken = reqlib('./utils/keys/user/auth-token');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client:video:get:fetch-video-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `videoId`
    .then(token => (
      validateObjectId(req.params.videoId)
        .then(videoId => ({ token, videoId }))
    ))

    // query video doc
    .then(({ token, videoId }) => (
      Video.findById(videoId).then(video => ({ token, video }))
    ))

    // inject props
    .then(({ token, video }) => (
      injectVideos(token, video)
    ))

    // check channel or category exists
    .then(video => {
      const now = moment();

      if (!video || now.isBefore(video.publishAt)) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      if (!video.channel || now.isBefore(video.channel.publishAt)) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      if (!video.category || now.isBefore(video.category.publishAt)) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return video;
    })

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

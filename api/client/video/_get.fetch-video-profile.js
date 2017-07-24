const validateObjectId = reqlib('./utils/validate-objectid');
const injectVideos = reqlib('./utils/models/inject/videos');
const handleError = reqlib('./utils/response/handle-error');
const auth = reqlib('./utils/access-keys/user/auth');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./utils/cacheKey');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['video:get:fetch-video-profile'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION)

    // validate `videoId`
    .then(keys => {
      const { userId } = keys || {};
      const { videoId } = req.params;

      return validateObjectId(videoId).then(videoId => ({ userId, videoId }));
    })
    // .then(({ userId }) => (
    //   validateObjectId(req.params.videoId).then(videoId => ({ userId, videoId }))
    // ))

    // quer video doc
    .then(({ userId, videoId }) => (
      Video.findById(videoId).then(video => ({ userId, video }))
    ))

    // check video exists
    .then(({ userId, video }) => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return { userId, video };
    })

    // inject videos
    .then(({ userId, video }) => (
      injectVideos(video, userId).then(videos => videos[0])
    ))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

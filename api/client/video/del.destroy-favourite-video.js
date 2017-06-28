const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/models/inject/videos');
const createClient = reqlib('./redis/create-client');
const auth = reqlib('./utils/access-keys/user/auth');
const cacheKey = reqlib('./utils/cacheKey');

const Video = reqlib('./models/Video');

const createVideoFavouriteUsersCacheKey = cacheKey('video:favourite-users');
const createUserFavouriteVideosCacheKey = cacheKey('user:favourite-videos');

const ACTION = config.apiActions['video:delete:destroy-favour-video'];

module.exports = (req, res, next) => {
  const { videoId } = req.params;

  auth(req.header('authorization'), ACTION, false)

    // validate `videoId`
    .then(({ userId }) => (
      validateObjectId(videoId).then(videoId => ({ userId, videoId }))
    ))

    // query video doc
    .then(({ userId, videoId }) => (
      Video.findById(videoId).then(video => ({ userId, videoId, video }))
    ))

    // check video exists
    .then(({ userId, videoId, video }) => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return { userId, videoId, video };
    })

    // create redis client & multi
    .then(args => {
      const client = createClient();
      const multi = client.multi();

      return { client, multi, ...args };
    })

    // remove user from video favourite users
    .then(args => {
      const { userId, videoId, multi } = args;
      const cacheKey = createVideoFavouriteUsersCacheKey(videoId);

      multi.srem(cacheKey, userId);

      return args;
    })

    // remove video from user favourite videos
    .then(args => {
      const { userId, videoId, multi } = args;
      const cacheKey = createUserFavouriteVideosCacheKey(userId);

      multi.srem(cacheKey, videoId);

      return args;
    })

    // exec redis multi command
    .then(({ userId, video, client, multi }) => (
      multi.execAsync().then(() => ({ userId, video, client }))
    ))

    // close redis client
    .then(({ userId, video, client }) => (
      client.quitAsync().then(() => ({ userId, video }))
    ))

    // inject videos
    .then(({ userId, video }) => (
      injectVideos(video, userId).then(videos => videos[0])
    ))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

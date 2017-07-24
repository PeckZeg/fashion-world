const Video = reqlib('./models/Video');
const auth = reqlib('./utils/access-keys/user/auth');
const validateObjectId = reqlib('./utils/validate-objectid');
const createRedisClient = reqlib('./redis/create-client');
const injectVideos = reqlib('./utils/models/inject/videos');
const cacheKey = reqlib('./utils/cacheKey');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['video:put:favour-video'];
const createVideoFavouriteUsersCacheKey = cacheKey('video:favourite-users');
const createUserFavouriteVideosCacheKey = cacheKey('user:favourite-videos');

module.exports = (req, res, next) => {
  const { videoId } = req.params;

  auth(req.header('authorization'), ACTION, false)

    // validate `videoId`
    .then(({ userId }) => (
      validateObjectId(videoId).then(videoId => ({ userId, videoId })
    )))

    // query video doc
    .then(({ videoId, userId }) => (
      Video.findById(videoId).then(video => ({ video, videoId, userId }))
    ))

    // check video exists
    .then(({ video, videoId, userId }) => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return { video, videoId, userId };
    })

    //  create redis client & multi
    .then(args => {
      const client = createRedisClient();
      const multi = client.multi();

      return { client, multi, ...args };
    })

    // add videoId to favourite users cache
    .then(args => {
      const { videoId, userId, multi } = args;
      const cacheKey = createVideoFavouriteUsersCacheKey(videoId);

      multi.sadd(cacheKey, userId);

      return args;
    })

    // add userId to favourite videos cache
    .then(args => {
      const { videoId, userId, multi } = args;
      const cacheKey = createUserFavouriteVideosCacheKey(userId);

      multi.sadd(cacheKey, videoId);

      return args;
    })

    // exec redis multi
    .then(({ userId, video, client, multi }) => (
      multi.execAsync().then(result => ({ userId, video, client }))
    ))

    // close redis client
    .then(({ userId, video, client }) => (
      client.quitAsync().then(() => ({ userId, video })
    )))

    // inject videos
    .then(({ userId, video }) => (
      injectVideos(video, userId).then(videos => videos[0])
    ))

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

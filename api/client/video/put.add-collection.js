const Video = reqlib('./models/Video');
const auth = reqlib('./utils/access-keys/user/auth');
const validateObjectId = reqlib('./utils/validate-objectid');
const createClient = reqlib('./redis/create-client');
const injectVideos = reqlib('./utils/models/inject/videos');
const cacheKey = reqlib('./utils/cacheKey');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['video:put:add-collection'];

const createVideoCollectedUsersCacheKey = cacheKey('video:collected-users');
const createUserCollectedVideosCacheKey = cacheKey('user:collected-videos');

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // validate `videoId`
    .then(({ userId }) => (
      validateObjectId(req.params.videoId).then(videoId => ({ userId, videoId }))
    ))

    // query video doc
    .then(({ videoId, userId }) => (
      Video.findById(videoId).then(video => ({ videoId, userId, video }))
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
      const client = createClient();
      const multi = client.multi();

      return { ...args, client, multi };
    })

    // add user to collected videos
    .then(args => {
      const { userId, videoId, multi } = args;
      const cacheKey = createVideoCollectedUsersCacheKey(videoId);
      const collectedAt = +new Date();

      multi.hset(cacheKey, userId.toString(), collectedAt);

      return { ...args, collectedAt };
    })

    // add video to collected users
    .then(args => {
      const { userId, videoId, multi, collectedAt } = args;
      const cacheKey = createUserCollectedVideosCacheKey(userId);

      multi.hset(cacheKey, videoId.toString(), collectedAt);

      return args;
    })

    // exec redis multi
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

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

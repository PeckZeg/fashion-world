const Video = reqlib('./models/Video');
const auth = reqlib('./utils/access-keys/user/auth');
const validateObjectId = reqlib('./utils/validate-objectid');
const createClient = reqlib('./redis/create-client');
const injectVideos = reqlib('./utils/models/inject/videos');
const cacheKey = reqlib('./utils/cacheKey');
const handleError = reqlib('./utils/response/handle-error');

const ACTION = config.apiActions['video:delete:destroy-collection'];

const createVideoCollectedUsersCacheKey = cacheKey('video:collected-users');
const createUserCollectedVideosCacheKey = cacheKey('user:collected-videos');

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

      return { ...args, client, multi };
    })

    // remove user from video collected users
    .then(args => {
      const { userId, videoId, multi } = args;
      const key = createVideoCollectedUsersCacheKey(videoId);

      multi.hdel(key, userId.toString());

      return args;
    })

    // remove video from user collected videos
    .then(args => {
      const { userId, videoId, multi } = args;
      const key = createUserCollectedVideosCacheKey(userId);

      multi.hdel(key, videoId);

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

    .then(video => res.send({ video }))
    .catch(err => handleError(res, err));
};

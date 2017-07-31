const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/model-injector/video');
const transformQuery = reqlib('./utils/transform-query');
const authToken = reqlib('./utils/keys/user/auth-token');
const createclient = reqlib('./redis/create-client');
const keys = reqlib('./redis/keys');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client:video:put:favour-video'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // validate `videoId`
    .then(token => (
      validateObjectId(req.params.videoId).then(videoId => ({ token, videoId }))
    ))

    // query video doc
    .then(({ token, videoId }) => (
      Video.findById(videoId).then(video => ({ token, video }))
    ))

    // check video exists
    .then(({ token, video }) => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return { token, video };
    })

    // create redis client & multi
    .then(args => {
      const client = createclient();
      const multi = client.multi();

      return { ...args, client, multi };
    })

    // add to favourite users
    .then(args => {
      const { token, video, multi } = args;
      const videoId = video._id;
      const userId = token.userId.toString();
      const cacheKey = keys('client:video:favourite-users')(videoId);
      const favourAt = +new Date();

      multi.hset(cacheKey, userId, favourAt);

      return { ...args, favourAt };
    })

    // add to favourite videos
    .then(args => {
      const { token, video, multi, favourAt } = args;
      const videoId = video._id;
      const userId = token.userId.toString();
      const cacheKey = keys('client:user:favourite-videos')(userId);

      multi.hset(cacheKey, videoId, favourAt);

      return args;
    })

    // exec redis multi
    .then(({ token, video, client, multi }) => (
      multi.execAsync().then(() => ({ token, video, client }))
    ))

    // close redis client
    .then(({ token, video, client }) => (
      client.quitAsync().then(() => ({ token, video }))
    ))

    // inject props
    .then(({ token, video }) => injectVideos(token, video))

    // ensure channel & category exists
    .then(video => {
      const now = moment();

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

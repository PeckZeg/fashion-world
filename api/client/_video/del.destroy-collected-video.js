const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/model-injector/video');
const transformQuery = reqlib('./utils/transform-query');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');
const keys = reqlib('./redis/keys');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client.video:del.destroy-collected-video'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // validate `videoId`
    .then(token => (
      validateObjectId(req.params.videoId)
        .then(videoId => ({ token, videoId }))
    ))

    // query video doc
    .then(({ token, videoId }) => (
      Video.findById(videoId).then(video => ({ token, video }))
    ))

    // ensure video exists
    .then(({ token, video }) => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return { token, video };
    })

    // create redis client & multi
    .then(args => {
      const client = createClient();
      const multi = client.multi();

      return { ...args, client, multi };
    })

    // remove from video collected users
    .then(args => {
      const { token, video, multi } = args;
      const userId = token.userId.toString();
      const videoId = video._id.toString();
      const cacheKey = keys('client:video:collected-users')(videoId);

      multi.hdel(cacheKey, userId);

      return args;
    })

    // remove from user collected videos
    .then(args => {
      const { token, video, multi } = args;
      const userId = token.userId.toString();
      const videoId = video._id.toString();
      const cacheKey = keys('client:user:collected-videos')(userId);

      multi.hdel(cacheKey, videoId);

      return args;
    })

    // exec redis multi command
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

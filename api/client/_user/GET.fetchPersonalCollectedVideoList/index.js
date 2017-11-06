const cacheKey = reqlib('./redis/keys')('client:user:collected-videos');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/model-injector/video');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');
const validateParams = require('./validateParams');

const Video = reqlib('./models/Video');

const { ObjectId } = require('mongoose').Types;
const ACTION = config.apiActions['client:user:get:fetch-user-collected-video-list'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // validate query params
    .then(token => (
      validateParams(req.query).then(query => ({ token, query }))
    ))

    // create redis client
    .then(args => ({ ...args, client: createClient() }))

    // fetch video list from cache
    .then(({ token, query, client }) => {
      const { userId } = token;
      const key = cacheKey(userId);

      return client.hgetallAsync(key)
        .then(videos => ({ token, query, client, videos }));
    })

    // close redis client
    .then(({ token, query, client, videos }) => (
      client.quitAsync().then(() => ({ token, query, videos }))
    ))

    // filter video id list
    .then(({ token, query, videos }) => {
      const { offset, limit } = query;
      const start = offset * limit;
      const end = start + limit;

      videos = _.chain(videos)
        .map((collectAt, videoId) => {
          videoId = ObjectId(videoId);
          collectAt = +collectAt;

          return { videoId, collectAt };
        })
        .sort((a, b) => b.collectAt - a.collectAt)
        .slice(start, end)
        .value();

      return { token, videos };
    })

    // fetch video docs
    .then(({ token, videos }) => (
      Video.find({ _id: { $in: _.map(videos, 'videoId') } })
        .then(videos => videos.map(video => video.toJSON()))
        .then(videoList => ({
          token,
          videos,
          videosById: _.keyBy(videoList, '_id')
        }))
    ))

    // merge videos
    .then(({ token, videos, videosById }) => {
      videos = _.chain(videos).map(({ videoId, collectAt }) => {
        const video = videosById[videoId];

        if (!video) return null;

        return { ...video, collectAt };
      }).compact().value();

      return { token, videos };
    })

    // inject props
    .then(({ token, videos }) => injectVideos(token, videos))

    .then(videos => res.send({ videos }))
    .catch(err => handleError(res, err));
};

const cacheKey = reqlib('./redis/keys')('client:user:favourite-videos');
const handleError = reqlib('./utils/response/handle-error');
const injectUsers = reqlib('./utils/model-injector/user');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');
const validateParams = require('./validateParams');

const { ObjectId } = require('mongoose').Types;
const User = reqlib('./models/User');

const ACTION = config.apiActions['client:user:get:fetch-user-favourite-video-list'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

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

      return client.hgetallAsync(key).then(videoIds => ({
        token,
        query,
        client,
        videoIds,
      }));
    })

    // close redis client
    .then(({ token, query, client, videoIds }) => (
      client.quitAsync().then(() => ({ token, query, videoIds }))
    ))

    // filter video id list
    .then(({ token, query, videoIds }) => {
      const { offset, limit } = query;
      const start = offset * limit;
      const end = start + limit;

      videoIds = _.chain(videoIds)
        .map((favourAt, videoId) => {
          videoId = ObjectId(videoId);
          favourAt = +favourAt;

          return { videoId, favourAt };
        })
        .sort((a, b) => b.favourAt - a.favourAt)
        .slice(start, end)
        .value();

      return { token, videoIds };
    })

    .then(videos => res.send({ videos }))
    .catch(err => handleError(res, err));
};

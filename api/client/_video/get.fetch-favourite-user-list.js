const validateParams = reqlib('./validate-models/client/video/fetch-favourite-user-list-params');
const handleError = reqlib('./utils/response/handle-error');
const injectVideos = reqlib('./utils/models/inject/videos');
const transformQuery = reqlib('./utils/transform-query');
const validateObjectId = reqlib('./utils/validate-objectid');
const createClient = reqlib('./redis/create-client');
const auth = reqlib('./utils/access-keys/user/auth');

const Video = reqlib('./models/Video');
const User = reqlib('./models/User');

const cacheKey = reqlib('./utils/cacheKey')('video:favourite-users');

module.exports = (req, res, next) => {
  validateObjectId(req.params.videoId)

    // validate query params
    .then(videoId => (
      validateParams(req.query).then(query => ({ videoId, query }))
    ))

    // query video doc
    .then(({ videoId, query }) => (
      Video.findById(videoId).then(video => ({ videoId, query, video }))
    ))

    // check video exists
    .then(({ videoId, query, video }) => {
      if (!video) {
        return Promise.reject(new ResponseError(404, 'video not found'));
      }

      return { videoId, query, video };
    })

    // create redis client
    .then(args => ({ client: createClient(), ...args }))

    // fetch userIds from cache
    .then(args => {
      const { videoId, client } = args;
      const key = cacheKey(videoId);

      return client.smembersAsync(key).then(userIds => ({ ...args, userIds }));
    })

    // close redis client
    .then(({ query, client, userIds }) => (
      client.quitAsync().then(() => ({ query, userIds }))
    ))

    // generate query options
    .then(({ query, userIds }) => {
      const { offset, limit } = query;
      const skip = offset * limit;
      const cond = { _id: { $in: userIds } };
      const sort = { createAt: -1 };

      return { cond, skip, limit, sort };
    })

    // query user docs
    .then(({ cond, skip, limit, sort }) => (
      User.find(cond).skip(skip).limit(limit).sort(sort)
    ))

    .then(users => res.send({ users }))
    .catch(err => handleError(res, err));
};

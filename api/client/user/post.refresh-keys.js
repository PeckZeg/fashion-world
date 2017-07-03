const handleError = reqlib('./utils/response/handle-error');
const cacheKey = reqlib('./redis/keys')('client:user:key');
const createKeys = reqlib('./utils/keys/user/create-keys');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');

const User = reqlib('./models/User');

const ACTION = config.apiActions['client:user:post:refresh-keys'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // fetch user doc
    .then(({ userId, apiKey }) => (
      User.findById(userId).exec().then(user => ({ apiKey, user }))
    ))

    // check user exists
    .then(({ apiKey, user }) => {
      if (!user) {
        return Promise.reject(new ResponseError(404, 'user not found'));
      }

      return { apiKey, user };
    })

    // remove keys from cache
    .then(({ apiKey, user }) => {
      const client = createClient();

      return client.multi()
        .del(cacheKey(user._id))
        .del(cacheKey(apiKey))
        .execAsync()
        .then(() => client.quitAsync())
        .then(() => user)
    })

    // create access keys
    .then(createKeys)

    .then(keys => res.send(keys))
    .catch(err => handleError(res, err));
};

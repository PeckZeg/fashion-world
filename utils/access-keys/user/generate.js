const createApiKey = reqlib('./utils/api-key');
const createSecretKey = reqlib('./utils/secret-key');
const client = reqlib('./redis/client');
const cacheKey = reqlib('./utils/cacheKey')('user.login');

const CACHE_DURATION = moment.duration(1, 'days');

module.exports = user => new Promise((resolve, reject) => {
  const USER_ID_CACHE_KEY = cacheKey(user._id);

  client.getAsync(USER_ID_CACHE_KEY)
    .then(keys => {
      if (keys) {
        keys = JSON.parse(keys);
        keys = Object.assign(keys, { user });
        return resolve(keys);
      }

      let apiKey = createApiKey(user);
      let secretKey = createSecretKey(apiKey);
      const API_KEY_CACHE_KEY = cacheKey(apiKey);

      keys = {
        apiKey, secretKey,
        userId: user._id,
        expiresIn: +moment().add(+CACHE_DURATION, 'ms')
      };

      let keysJSON = JSON.stringify(keys);
      let expireSeconds = CACHE_DURATION.asSeconds();

      return client.multi()
        .set(USER_ID_CACHE_KEY, keysJSON)
        .expire(USER_ID_CACHE_KEY, expireSeconds)
        .set(API_KEY_CACHE_KEY, keysJSON)
        .expire(API_KEY_CACHE_KEY, expireSeconds)
        .execAsync()
        .then(() => Promise.resolve(Object.assign(keys, { user })))
    })
    .then(keys => resolve(keys))
    .catch(err => reject(err));
});

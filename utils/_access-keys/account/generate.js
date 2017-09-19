const createApiKey = require('../../api-key');
const createSecretKey = require('../../secret-key');
const client = require('../../../redis/client');
const cacheKey = reqlib('./utils/cacheKey')('account.login');

const CACHE_DURATION = moment.duration(1, 'days');

module.exports = account => new Promise((resolve, reject) => {
  const ACCOUNT_ID_CACHE_KEY = cacheKey(account._id);

  client.getAsync(ACCOUNT_ID_CACHE_KEY)
    .then(keys => {
      if (keys) {
        keys = JSON.parse(keys);
        return resolve(Object.assign(keys, { account }));
      }

      let apiKey = createApiKey(account);
      let secretKey = createSecretKey(apiKey);
      const API_KEY_CACHE_KEY = cacheKey(apiKey);

      keys = {
        apiKey, secretKey,
        accountId: account._id,
        expiresIn: +moment().add(+CACHE_DURATION, 'ms')
      };

      let keysJSON = JSON.stringify(keys);
      let expireSeconds = CACHE_DURATION.asSeconds();

      return client.multi()
        .set(ACCOUNT_ID_CACHE_KEY, keysJSON)
        .expire(ACCOUNT_ID_CACHE_KEY, expireSeconds)
        .set(API_KEY_CACHE_KEY, keysJSON)
        .expire(API_KEY_CACHE_KEY, expireSeconds)
        .execAsync()
        .then(() => Promise.resolve(Object.assign(keys, { account })))
    })
    .then(keys => resolve(keys))
    .catch(err => reject(err));
});

const auth = require('../../../utils/access-keys/account/auth');
const redis = reqlib('./redis/client');
const cacheKey = reqlib('./utils/access-keys/account/cache-key');

const ACTION = config.apiActions['account.delete.logout'];

module.exports = (req, res, next) => {
  let authorization = req.header('authorization');

  auth(authorization, ACTION)
    .then(keys => {
      return redis.multi()
        .del(cacheKey(keys.accountId))
        .del(cacheKey(keys.apiKey))
        .execAsync()
    })
    .then(result => {
      res.send({ result: 'ok' });
    })
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

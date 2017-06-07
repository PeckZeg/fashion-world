const auth = require('../../../utils/access-keys/account/auth');
const client = reqlib('./redis/client');
const cacheKey = reqlib('./utils/cacheKey')('account.login');

const ACTION = config.apiActions['admin:account:delete:logout'];

module.exports = (req, res, next) => {
  let authorization = req.header('authorization');

  auth(authorization, ACTION)
    .then(keys => {
      return client.multi()
        .del(cacheKey(keys.accountId))
        .del(cacheKey(keys.apiKey))
        .execAsync()
    })
    .then(result => {
      res.send({ result: 'ok' });
    })
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

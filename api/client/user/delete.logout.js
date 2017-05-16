const auth = reqlib('./utils/access-keys/user/auth');
const client = reqlib('./redis/client');
const cacheKey = reqlib('./utils/cacheKey')('user.login');

const ACTION = config.apiActions['user.delete.logout'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION)
    .then(keys => (
      client.multi()
        .del(cacheKey(keys.userId))
        .del(cacheKey(keys.apiKey))
        .execAsync()
    ))
    .then(() => res.send({ result: 'ok' }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

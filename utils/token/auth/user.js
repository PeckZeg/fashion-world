const cacheKey = reqlib('./redis/keys/client/user');
const auth = require('./index');

module.exports = (req, action, opts = {}) => (
  auth(req, action, {
    logIdProp: 'userId',
    cacheKey,
    ...opts,
  })
);

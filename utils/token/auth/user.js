const cacheKey = reqlib('./redis/keys')('client:user:key');
const auth = require('./index');

module.exports = (req, action, opts = {}) => (
  auth(req, action, {
    required: true,
    logIdProp: 'userId',
    cacheKey,
    ...opts,
  })
);

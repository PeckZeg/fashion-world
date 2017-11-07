const cacheKey = reqlib('./redis/keys/admin/account');
const auth = require('./index');

module.exports = (req, action, opts = {}) => (
  auth(req, action, {
    required: true,
    logIdProp: 'accountId',
    cacheKey,
    ...opts,
  })
);

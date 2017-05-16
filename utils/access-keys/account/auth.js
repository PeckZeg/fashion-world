const auth = reqlib('./utils/access-keys/auth');
const cacheKey = reqlib('./utils/cacheKey')('account.login');

module.exports = (authorization, action, required = true) => (
  auth(authorization, action, required, cacheKey)
);

const auth = reqlib('./utils/access-keys/auth');
const cacheKey = reqlib('./utils/cacheKey')('account.login');

module.exports = (authorization, action, optional = false) => (
  auth(authorization, action, optional, cacheKey)
);

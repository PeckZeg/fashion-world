const cacheKey = reqlib('./utils/cacheKey')('user.login');
const auth = reqlib('./utils/access-keys/auth');

module.exports = (authorization, action, required = true) => (
  auth(authorization, action, required, cacheKey)
);

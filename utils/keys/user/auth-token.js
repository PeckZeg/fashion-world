const cacheKey = reqlib('./redis/keys')('client:user:login');
const authToken = reqlib('./utils/keys/auth-token');

module.exports = (action, authorization, required) => (
  authToken(action, authorization, { required, cacheKey })
);

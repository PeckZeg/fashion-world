const cacheKey = reqlib('./redis/keys')('client:user:key');
const authToken = reqlib('./utils/keys/auth-token');

const { ObjectId } = require('mongoose').Types;

module.exports = (action, authorization, required = false) => (
  authToken(action, authorization, {
    required,
    cacheKey,
    transformKeys: keys => ({ ...keys, userId: ObjectId(keys.userId) })
  })
);

const cacheKey = reqlib('./redis/keys')('admin:account:key');
const authToken = reqlib('./utils/keys/auth-token');

const { ObjectId } = require('mongoose').Types;

module.exports = (action, authorization, required = true) => (
  authToken(action, authorization, {
    required,
    cacheKey,
    transformKeys: keys => ({ ...keys, accountId: ObjectId(keys.accountId) })
  })
);

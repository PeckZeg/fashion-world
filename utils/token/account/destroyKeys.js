const cacheKey = require('redis/keys/admin/account');
const createClient = require('redis/createClient');

/**
 *  摧毁令牌
 *  @param {object} token 令牌
 *  @param {object} token.apiKey 令牌接口键
 *  @param {object} accountId 账号编号
 */
module.exports = async token => {
  if (!token) {
    throw new ResponseError(404, 'token not found');
  }

  const client = createClient();
  const { apiKey, accountId } = token;

  await client.multi()
          .del(cacheKey(apiKey))
          .del(cacheKey(accountId))
          .execAsync();

  await client.quitAsync();
};

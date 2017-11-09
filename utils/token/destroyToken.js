const createClient = require('redis/createClient');

/**
 *  删除令牌
 *  @param {Function} cacheKey 缓存键生成器
 *  @param {object} model 当前登录的用户/账号
 *  @param {string} apiKey 登录的接口键
 */
module.exports = async (cacheKey, model, apiKey) => {
  const client = createClient();
  const multi = client.multi();

  await multi.del(cacheKey(apiKey)).del(cacheKey(model._id)).execAsync();
  await client.quitAsync();
};

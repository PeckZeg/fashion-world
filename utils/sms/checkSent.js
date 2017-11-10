const cacheKey = require('redis/keys/client/sms/sent');

/**
 *  检查短信是否已发送至 `mobile`
 *  @param client Redis Client 实例
 *  @param {string} mobile 检查的手机号码
 *  @returns 是否已经发送标记位
 */
module.exports = async (client, mobile) => await client.existsAsync(
  cacheKey(mobile)
);

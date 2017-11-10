const cacheKey = require('redis/keys/client/sms/maxPerHour');

/**
 *  在发送给 `mobile` 的消息未达到上限时，增加一次已发送记录
 *  @param client Redis Client 实例
 *  @param {string} mobile 手机号码
 *  @returns 处理结果
 */
module.exports = async (client, mobile) => {
  const key = cacheKey(mobile);
  const exists = await client.existsAsync(key);
  const multi = client.multi();

  multi.incr(key);

  if (!exists) {
    multi.expire(key, moment.duration(1, 'h').asSeconds());
  }

  return await multi.execAsync();
};

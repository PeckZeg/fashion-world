const cacheKey = require('redis/keys/client/sms/maxPerHour');
const toNumber = require('./toNumber');
const { MAX_COUNT_PER_HOUR } = config.alidayu;

/**
 *  检查最近一小时内发送给 `mobile` 的短信是否达到上限
 *  @param client Redis Client 实例
 *  @param {string} mobile 检查的手机号码
 */
module.exports = async (client, mobile) => {
  const key = cacheKey(mobile);
  const count = toNumber(await client.getAsync(key));

  if (count >= MAX_COUNT_PER_HOUR) {
    throw new ResponseError(403, 'mobile has reached the max times');
  }
};

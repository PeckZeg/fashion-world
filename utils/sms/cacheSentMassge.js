const cacheKey = require('redis/keys/client/sms/sent');
const isString = require('lodash/isString');

const { MESSAGE_LIVE_CYCLE } = config.alidayu;

/**
 *  缓存发送给 `mobile` 的消息
 *  @param client Redis Client 实例
 *  @param {string} mobile 手机号码
 *  @param {*} message 待缓存的消息
 *  @returns {number} 过期时间戳
 */
module.exports = async (client, mobile, message) => {
  const multi = client.multi();
  const key = cacheKey(mobile);
  const expire = moment.duration(MESSAGE_LIVE_CYCLE);

  if (!isString(message)) {
    message = message + '';
  }

  await multi.set(key, message).expire(key, expire.asSeconds()).execAsync();

  return +moment().add(+expire);
};

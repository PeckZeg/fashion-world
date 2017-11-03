/**
 *  手机 `mobile` 每日发送限制缓存键
 *  @param {string} mobile 手机号码
 *  @returns {string} 生成的缓存键
 */
module.exports = mobile => `sms:mobile:${mobile}:sent-per-day`;

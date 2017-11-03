/**
 *  手机 `mobile` 是否已发送信息
 *  @param {string} mobile 手机号码
 *  @returns {string} 生成的缓存键
 */
module.exports = mobile => `sms:mobile:${mobile}`;

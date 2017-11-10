/**
 *  验证码生成器
 *  @param {number} [len = 6] 验证码长度
 *  @returns {string} 长度为 `len` 的验证码
 */
module.exports = (len = 6) => require('mockjs').mock(new RegExp(`\\d{${len}}`));

/\d{6}/

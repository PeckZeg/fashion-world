/**
 *  生成一个用户的缓存键
 *  @param {ObjectId} key 生成缓存键的标记
 *  @returns {string} 生成的缓存键
 */
module.exports = key => `client:user:${key}:key`;

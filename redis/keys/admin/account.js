/**
 *  生成一个账号的缓存键
 *  @param {ObjectId|string} key 生成缓存键的标记，可以为一个 `ObjectId`
 *                               也可以是一个 `apiKey`
 *  @returns {string} 生成的缓存键
 */
module.exports = key => `admin:account:${key}:key`;

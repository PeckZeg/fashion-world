const cacheKey = require('redis/keys/client/user');
const destroyToken = require('../destroyToken');

/**
 *  删除用户令牌
 *  @param {object} user 当前登录的用户
 *  @param {string} apiKey 登录的接口键
 */
module.exports = async (...args) => await destroyToken(cacheKey, ...args);

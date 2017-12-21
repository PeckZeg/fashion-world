/**
 *  生成用户喜欢的视频列表缓存键
 *  @param {ObjectId} userId 用户编号
 *  @returns {string} 生成的缓存键
 */
module.exports = userId => `client:user:${userId}:collected-videos`;

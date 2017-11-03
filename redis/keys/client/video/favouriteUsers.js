/**
 *  生成视频 `videoId` 的喜欢的用户列表的缓存键
 *  @param {ObjectId} 视频编号
 *  @returns 生成的缓存键
 */
module.exports = videoId => `client:video:${videoId}:favourite-users`;

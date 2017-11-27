const cacheKey = require('scripts/migrateVideo/keys/completeList');
const createClient = require('redis/createClient');

/**
 *  检查 `videoId` 是否已转换完毕
 *  @param {ObjectId} videoId 视频编号
 *  @returns {boolean} 完成标记
 */
module.exports = async videoId => {
  const client = createClient();
  const isComplete = await client.sismemberAsync(cacheKey, videoId);

  await client.quitAsync();

  return !!isComplete;
};

/**
 *  获取 `bucket - key` 的 mime 类型
 *  @param {BucketManager} bucketManager 容器管理器
 *  @param {string} bucket 容器
 *  @param {string} key 存储键
 */
module.exports = async (bucketManager, bucket, key) => {
  const [respBody, respInfo] = await bucketManager.statAsync(bucket, key);

  if (respInfo.statusCode == 200) {
    return respBody;
  }

  throw new ResponseError(respInfo.statusCode, respBody.error);
};

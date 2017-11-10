const { appkey, appsecret, REST_URL } = config.alidayu;

/**
 *  创建阿里大于客户端实例实例
 *  @returns {TopClient} 阿里大于客户端实例
 */
module.exports = () => new require('topSdk').TopClient({
  appkey,
  appsecret,
  REST_URL
});

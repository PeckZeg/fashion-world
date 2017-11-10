const TopClient = require('topSdk').TopClient;

/**
 *  @deprecated
 */
module.exports = new TopClient({
  appkey: config.alidayu.appkey,
  appsecret: config.alidayu.appsecret,
  REST_URL: config.alidayu.restUrl
});

const TopClient = require('topSdk').TopClient;

module.exports = new TopClient({
  appkey: config.alidayu.appkey,
  appsecret: config.alidayu.appsecret,
  REST_URL: config.alidayu.restUrl
});

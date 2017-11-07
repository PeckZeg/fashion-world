const qiniu = require('qiniu');

const createMac = require('./createMac');

/**
 *  创建七牛对象存储上传凭证
 *  @param {object} opts 配置项，参见七牛开发者中心
 *  @returns {*} 返回一个上传凭证
 */
module.exports = (opts = {}) => {
  const mac = createMac();
  const putPolicy = new qiniu.rs.PutPolicy(opts);

  return putPolicy.uploadToken(mac);
};

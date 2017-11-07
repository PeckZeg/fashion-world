const qiniu = require('qiniu');

const { accessKey, secretKey } = config.qiniu;

/**
 *  创建七牛鉴权对象
 *  @returns 返回一个鉴权对象示例
 */
module.exports = () => new qiniu.auth.digest.Mac(accessKey, secretKey);

const request = require('request-promise');
const toUrl = require('./toUrl');

/**
 *  获取视频信息
 *  @param {string} [base = images] Bucket 至 Host 映射，参见 config/qiniu/host.js
 *  @param {string} input 地址
 *  @returns {string} 视频信息
 */
module.exports = async (...args) => {
  const url = toUrl(...args);

  return await request({ url: `${url}?avinfo`, json: true });
};

const request = require('request-promise');
const { URL } = require('url');

/**
 *  获取公网链接地址
 *  @param {string} pathname 拼接的地址名
 *  @returns {string} url 地址
 */
module.exports = async pathname => {
  const { ip } = await request({
    url: 'https://api.ipify.org/?format=json',
    json: true
  });
  const url = new URL(`http://${ip}`);

  url.port = 5053;

  if (pathname) {
    url.pathname = pathname;
  }

  return url.toString();
};

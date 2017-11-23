const request = require('request-promise');
const toUrl = require('./toUrl');
const { URL } = require('url');
const { originHost } = config.qiniu;

/**
 *  获取文件的 sha1 信息
 *  @param {string} [base = images] Bucket 至 Host 映射，参见 config/qiniu/host.js
 *  @param {string} input 图片相对地址
 *  @returns {string} 完整的 URL 路径
 */
module.exports = async (...args) => {
  let base, input;

  switch (args.length) {
    case 1:
      base = 'images';
      input = args[0];
      break;

    case 2:
    default:
      base = args[0];
      input = args[1];
  }


  const url = (new URL(input, originHost[base])).toString();
  const { hash } = await request({ url: `${url}?qhash/sha1`, json: true });

  return hash;
};

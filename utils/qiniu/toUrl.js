const { URL } = require('url');
const { host } = config.qiniu;

/**
 *  生成基于七牛云的图片地址
 *  @param {string} [base = images] Bucket 至 Host 映射，参见 config/qiniu/host.js
 *  @param {string} input 图片相对地址
 *  @returns {string} 完整的 URL 路径
 */
module.exports = (...args) => {
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

  return input ? (new URL(input, host[base])).toString() : null;
};

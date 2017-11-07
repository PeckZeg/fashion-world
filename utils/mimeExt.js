const mime = require('mime-types');

/**
 *  从 `mime` 类型获取文件名后缀
 *  @param {string} mimeType
 *  @returns {string} 后缀名
 */
module.exports = mimeType => {
  let extname = mime.extension(mimeType);
  return extname ? `.${extname}` : '';
};

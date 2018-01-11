const ftpUtils = require('../ftp-client');

/**
 *  列出文件列表
 *  @param {string} folder 待查询的目录
 *  @param {object} [opts = {}] 参数
 *  @param {object} opts.connect 连接参数
 *  @returns {Promise}
 */
module.exports = async function(folder = '/', opts = {}) {
  const { connect } = opts;
  const client = await ftpUtils.create();

  await ftpUtils.connect(client, connect);
  const files = await ftpUtils.list(client, folder);
  await ftpUtils.end(client);

  return files;
};

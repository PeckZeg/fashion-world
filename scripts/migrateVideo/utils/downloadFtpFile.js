const syncUtils = require('../../utils');

/**
 *  下载 FTP 文件
 *  @param {string} src FTP 上的文件路径
 *  @param {string} dest 保存到本地的文件路径
 *  @param {object} [opts = {}] 可选项
 *  @param {object} [opts.connect] FTP 连接参数
 *  @returns {string} 保存到本地的文件路径
 */
module.exports = async (src, dest, opts = {}) => {
  const client = await syncUtils.ftp.create();
  const { connect } = opts;

  await syncUtils.ftp.connect(client, connect);
  await syncUtils.ftp.get(client, src, dest);
  await syncUtils.ftp.end(client);

  return dest;
};

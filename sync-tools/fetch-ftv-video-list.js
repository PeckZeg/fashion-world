const FtpClient = require('ftp');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../utils/global-mixins');
const ftpMethods = require('./ftp-client');

const {
  lanConnect: FTP_CONNECT_PARAMS,
  folders: {
    ftv: FTP_FTV_FOLDER
  }
} = config.ftpServer;

module.exports = () => Promise.resolve(new FtpClient())

  // connect ftp client
  .then(ftpClient => (
    ftpMethods.connect(ftpClient, FTP_CONNECT_PARAMS).then(() => {
      debug(`已经连接 FTP 服务器`);
      return ftpClient;
    })
  ))

  // read video list
  .then(ftpClient => (
    ftpMethods.list(ftpClient, FTP_FTV_FOLDER).then(files => {
      debug(`已经读取 FTV 视频列表`);
      return { ftpClient, files };
    })
  ))

  // pick mp4 files
  .then(({ ftpClient, files }) => {
    files = _.chain(files).map(file => (
      path.extname(file.name).endsWith('mp4') ? file : null
    )).compact().value();

    return { ftpClient, files };
  })

  // close ftp client
  .then(({ ftpClient, files }) => ftpMethods.end(ftpClient).then(() => files));

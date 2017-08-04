const path = require('path');

const syncUtils = require('../../utils');

const { resource: CONNECT_PARAMS } = config.ftpServer;
const { folders: FTP_FOLDERS } = CONNECT_PARAMS;

module.exports = () => syncUtils.ftp.create()

  // connect ftp
  .then(ftpClient => (
    syncUtils.ftp.connect(ftpClient, CONNECT_PARAMS)
  ))

  // list ftp files
  .then(ftpClient => (
    syncUtils.ftp.list(ftpClient, FTP_FOLDERS.images)
      .then(files => ({ ftpClient, files }))
  ))

  // close ftp client
  .then(({ ftpClient, files }) => (
    syncUtils.ftp.end(ftpClient).then(() => files)
  ))

  // filter image list
  .then(files => files.filter(file => file.name.endsWith('jpg') && file.type !== 'd'))

  // transform name
  .then(images => images.map(image => path.join('/static', FTP_FOLDERS.images, image.name)));

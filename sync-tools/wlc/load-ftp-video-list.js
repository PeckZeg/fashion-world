const syncUtils = require('../utils');

const { fashionWorld: CONNECT_OPTS } = config.ftpServer;

module.exports = folderpath => Promise.resolve(folderpath)

  // create ftp client
  .then(folderpath => (
    syncUtils.ftp.create().then(ftpClient => ({ folderpath, ftpClient }))
  ))

  // connect ftp client
  .then(({ folderpath, ftpClient }) => (
    syncUtils.ftp.connect(ftpClient, CONNECT_OPTS)
      .then(ftpClient => ({ folderpath, ftpClient }))
  ))

  // list folder files
  .then(({ folderpath, ftpClient }) => (
    syncUtils.ftp.list(ftpClient, folderpath)
      .then(videos => ({ ftpClient, videos }))
  ))

  // close ftp client
  .then(({ ftpClient, videos }) =>(
    syncUtils.ftp.end(ftpClient).then(() => videos)
  ))

  // filter mp4 files
  .then(videos => videos.filter(video => video.name.endsWith('mp4')));

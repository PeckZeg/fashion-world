const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../utils');

const { fashionWorld: CONNECT_OPTS } = config.ftpServer;

module.exports = (
  folderpath,
  connectOpts = CONNECT_OPTS
) => Promise.resolve(folderpath)

  // create ftp client
  .then(folderpath => {
    debug(`正在读取视频列表 - ${folderpath}`);
    return syncUtils.ftp.create()
      .then(ftpClient => ({ folderpath, ftpClient }));
  })

  // connect ftp client
  .then(({ folderpath, ftpClient }) => (
    syncUtils.ftp.connect(ftpClient, connectOpts)
      .then(ftpClient => ({ folderpath, ftpClient }))
  ))

  // list folder files
  .then(({ folderpath, ftpClient }) => (
    syncUtils.ftp.list(ftpClient, folderpath)
      .then(videos => ({ ftpClient, videos }))
  ))

  // close ftp client
  .then(({ ftpClient, videos }) => (
    syncUtils.ftp.end(ftpClient).then(() => videos)
  ))

  .then(videos => videos.filter(video => video.name.endsWith('mp4')))

  .then(videos => videos.map(video => {
    const { name, size, date } = video;
    const uploadAt = +moment(date);
    const pathname = path.join(folderpath, name);

    return { name, pathname, uploadAt, size };
  }));

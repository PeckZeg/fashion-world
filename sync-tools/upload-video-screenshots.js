const mapLimit = require('async/mapLimit');
const debug = require('debug')('async');

const syncUtils = require('./utils');

const { resource: CONNECT_OPTS } = config.ftpServer;
const { folders: UPLOAD_FOLDERS } = CONNECT_OPTS;

module.exports = screenshots => Promise.resolve(screenshots)

  // create ftp client
  .then(screenshots => (
    syncUtils.ftp.create().then(ftpClient => ({ ftpClient, screenshots }))
  ))

  // connect ftp client
  .then(({ ftpClient, screenshots }) => (
    syncUtils.ftp.connect(ftpClient, CONNECT_OPTS)
      .then(ftpClient => ({ ftpClient, screenshots }))
  ))

  // upload each screenshot
  .then(({ ftpClient, screenshots }) => new Promise((resolve, reject) => {
    mapLimit(screenshots, 1, (screenshot, cb) => {
      debug(`正在上传截图 ${screenshot}`);
      syncUtils.ftp.put(ftpClient, screenshot, UPLOAD_FOLDERS.images)
        .then(pathname => {
          const { basePathname } = config.ftpToHttp.resource;
          const screenshot = path.join('/', basePathname, pathname);

          cb(null, screenshot);
        })
        .catch(cb);
    }, (err, screenshots) => {
      if (err) return reject(err);
      resolve({ ftpClient, screenshots });
    });
  }))

  // close ftp client
  .then(({ ftpClient, screenshots }) => (
    syncUtils.ftp.end(ftpClient).then(() => screenshots)
  ));

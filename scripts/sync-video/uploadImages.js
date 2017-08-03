const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../utils');

const { resource: CONNECT_OPTS } = config.ftpServer;
const { folders: UPLOAD_FOLDERS } = CONNECT_OPTS;

module.exports = images => Promise.resolve(images)

  // create ftp client
  .then(images => (
    syncUtils.ftp.create().then(ftpClient => ({ ftpClient, images }))
  ))

  // connect ftp client
  .then(({ ftpClient, images }) => (
    syncUtils.ftp.connect(ftpClient, CONNECT_OPTS)
      .then(ftpClient => ({ ftpClient, images }))
  ))

  // upload each screenshot
  .then(({ ftpClient, images }) => new Promise((resolve, reject) => {
    debug(`准备上传图片，共 ${images.length} 张`);

    mapLimit(images, 1, (image, cb) => {
      const idx = images.indexOf(image);
      const { basePathname } = config.ftpToHttp.resource;

      debug(`正在上传截图 ${idx}: ${path.basename(image)}`);

      syncUtils.ftp.put(ftpClient, image, UPLOAD_FOLDERS.images)
        .then(pathname => cb(null, path.join('/', basePathname, pathname)))
        .catch(cb);
    }, (err, images) => {
      if (err) return reject(err);
      resolve({ ftpClient, images });
    });
  }))

  // close ftp client
  .then(({ ftpClient, images }) => (
    syncUtils.ftp.end(ftpClient).then(() => images)
  ));

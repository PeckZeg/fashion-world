const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../utils');

const { resource: CONNECT_OPTS } = config.ftpServer;
const { folders: UPLOAD_FOLDERS } = CONNECT_OPTS;

module.exports = definitions => Promise.resolve(definitions)

  // create ftp client
  .then(definitions => (
    syncUtils.ftp.create().then(ftpClient => ({ ftpClient, definitions }))
  ))

  // connect ftp client
  .then(({ ftpClient, definitions }) => (
    syncUtils.ftp.connect(ftpClient, CONNECT_OPTS)
      .then(ftpClient => ({ ftpClient, definitions }))
  ))

  // upload each definitions
  .then(({ ftpClient, definitions }) => new Promise((resolve, reject) => {
    debug(`准备上传转换后的视频，共计 ${definitions.length} 个`);

    mapLimit(definitions, 1, (definition, cb) => {
      const { filepath } = definition;
      const { basePathname } = config.ftpToHttp.resource;

      debug(`正在上传 ${definition.definition} 的视频`);

      syncUtils.ftp.put(ftpClient, filepath, UPLOAD_FOLDERS.videos)
        .then(pathname => cb(null, ({
          ...definition,
          filepath: path.join('/', basePathname, pathname)
        })))
        .catch(cb);
    }, (err, definitions) => {
      if (err) return reject(err);
      resolve({ ftpClient, definitions });
    });
  }))

  // close ftp client
  .then(({ ftpClient, definitions }) => (
    syncUtils.ftp.end(ftpClient).then(() => definitions)
  ));

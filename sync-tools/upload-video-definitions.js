const mapLimit = require('async/mapLimit');

const syncUtils = require('./utils');

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
    mapLimit(definitions, 1, (definition, cb) => {
      const { filepath } = definition;

      syncUtils.ftp.put(ftpClient, filepath, UPLOAD_FOLDERS.videos)
        .then(pathname => {
          const { basePathname } = config.ftpToHttp.resource;
          const filepath = path.join('/', basePathname, pathname);

          cb(null, { ...definition, filepath });
        })
        .catch(cb);
    }, (err, definitions) => {
      if (err) return reject(err);
      resource({ ftpClient, definitions });
    });
  }))

  // close ftp client
  .then(({ ftpClient, definitions }) => (
    syncUtils.ftp.end(ftpClient).then(() => definitions)
  ))

const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../../utils');

const DefinitionVideo = reqlib('./models/DefinitionVideo');

const { resource: CONNECT_OPTS } = config.ftpServer;
const { folders: RES_FOLDERS } = CONNECT_OPTS;
const OPTS = { new: true };

module.exports = definitions => syncUtils.ftp.create()

  // connect ftp
  .then(ftpClient => syncUtils.ftp.connect(ftpClient, CONNECT_OPTS))

  // destroy each definitions
  .then(ftpClient => new Promise((resolve, reject) => {
    debug(`正在清除陈旧的视频文件，共计 ${definitions.length} 个`);
    mapLimit(definitions, 1, (definition, cb) => {
      const { filename } = definition;
      const filepath = path.join(RES_FOLDERS.videos, filename);

      debug(`正在清除陈旧的视频文件 - ${filename}`);

      syncUtils.ftp.list(ftpClient, RES_FOLDERS.videos)
        .then(videos => {
          videos = videos.filter(video => video.name == filename);

          if (videos.length) {
            return syncUtils.ftp.delete(ftpClient, filepath);
          }

          return null;
        })

        .then(() => cb(null, definition))
        .catch(cb);
    }, (err, definitions) => {
      !err ? resolve({ ftpClient, definitions }) : reject(err);
    });
  }))

  // close ftp
  .then(({ ftpClient, definitions }) => (
    syncUtils.ftp.end(ftpClient).then(() => definitions)
  ));

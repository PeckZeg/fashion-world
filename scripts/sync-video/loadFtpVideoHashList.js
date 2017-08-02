const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');

const syncUtils = require('../utils');

const { fashionWorld: CONNECT_OPTS } = config.ftpServer;

module.exports = filepath => Promise.resolve(filepath)

  // create ftp client
  .then(filepath => (
    syncUtils.ftp.create().then(ftpClient => ({ filepath, ftpClient }))
  ))

  // connect ftp client
  .then(({ filepath, ftpClient }) => (
    syncUtils.ftp.connect(ftpClient, CONNECT_OPTS)
      .then(ftpClient => ({ filepath, ftpClient }))
  ))

  // download hash file
  .then(({ filepath, ftpClient }) => {
    const extname = path.extname(filepath);
    const destpath = path.join('/tmp', `${uuid()}${extname}`);

    return syncUtils.ftp.get(ftpClient, filepath, destpath)
      .then(filepath => ({ ftpClient, filepath }));
  })

  // close ftp client
  .then(({ ftpClient, filepath }) => (
    syncUtils.ftp.end(ftpClient).then(() => filepath)
  ))

  // gen hash file sha1
  .then(filepath => (
    syncUtils.file.genSha1(filepath).then(sha1 => ({ filepath, sha1 }))
  ))

  // rename hash file
  .then(({ filepath, sha1 }) => {
    const dirname = path.dirname(filepath);
    const extname = path.extname(filepath);
    const destpath = path.join(dirname, `${sha1}${extname}`);

    return syncUtils.file.rename(filepath, destpath);
  })

  // read data
  .then(filepath => (
    syncUtils.csv(filepath, '  ')
      .then(sha1VideoList => ({ filepath, sha1VideoList }))
  ))

  // transform data
  .then(({ filepath, sha1VideoList }) => {
    sha1VideoList = sha1VideoList.map(video => {
      const [sha1, filename] = video;
      return { sha1, filename };
    });

    return { filepath, sha1VideoList };
  })

  // remove file
  .then(({ filepath, sha1VideoList }) => (
    syncUtils.file.remove(filepath).then(() => sha1VideoList)
  ));

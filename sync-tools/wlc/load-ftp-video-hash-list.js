const transform = require('stream-transform');
const parse = require('csv-parse');
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
  .then(({ ftpClient, filepath }) =>(
    syncUtils.ftp.end(ftpClient).then(() => filepath)
  ))

  // generate sha1
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
  .then(filepath => new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filepath);
    const parser = parse({ delimiter: '  ' });
    const transformer = transform(data => data);
    const sha1Videos = [];

    transformer.on('error', reject);

    transformer.on('readable', () => {
      let row;

      while (row = transformer.read()) {
        sha1Videos.push(row);
      }
    });

    transformer.on('finish', () => resolve({
      sha1Videos,
      filepath
    }));

    readStream.pipe(parser).pipe(transformer);
  }))

  // transform data
  .then(({ sha1Videos, filepath }) => {
    sha1Videos = sha1Videos.map(video => {
      const [sha1, filename] = video;
      return { sha1, filename };
    });

    return { sha1Videos, filepath };
  })

  // delete file
  .then(({ sha1Videos, filepath }) => (
    syncUtils.file.remove(filepath).then(() => sha1Videos)
  ));

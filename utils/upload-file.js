const mime = require('mime-types');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const path = require('path');
const url = require('url');
const fs = require('fs');

const { exec } = require('child_process');

module.exports = (upload, opts = {}) => new Promise((resolve, reject) => {
  const { req, res } = opts;

  upload(req, res, err => {
    if (err) return reject(caaError(500, err.message));
    resolve({ opts, file: req.file });
  });
})

  // generate sha1
  .then(({ file, opts }) => new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    const readStream = fs.createReadStream(file.path);

    readStream.on('readable', () => {
      const data = readStream.read();
      if (data) hash.update(data);
    });

    readStream.on('end', () => {
      resolve({ file, opts, sha1: hash.digest('hex') });
    });

    readStream.on('error', reject);
  }))

  // ensure destination exists
  .then(({ file, opts, sha1 }) => new Promise((resolve, reject) => {
    const { destination } = opts;
    const destFolder = path.join(config.localStaticPath, destination);

    mkdirp(destFolder, err => {
      if (err) return reject(err);
      resolve({ file, opts, sha1, destFolder });
    });
  }))

  // move and rename file
  .then(({ file, opts, sha1, destFolder }) => new Promise((resolve, reject) => {
    const { path: srcPath, mimetype } = file;
    const { destination } = opts;
    const extension = mime.extension(mimetype) ? `.${mime.extension(mimetype)}` : '';
    const filename = `${sha1}${extension}`;
    const destPath = `${destFolder}/${filename}`;

    exec(`mv -f ${srcPath} ${destPath}`, err => {
      if (err) return reject(err);
      resolve({
        path: destPath,
        urlPath: url.format({
          ...config.resource,
          pathname: path.join('/static', destination, filename)
        })
      });
    });
  }));

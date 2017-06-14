const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
const crypto = require('crypto');
const mapLimit = require('async/mapLimit');
const { exec } = require('child_process');

module.exports = ({ ftpClient, file, debug, metadata }) => new Promise((resolve, reject) => {
  const { sha1 } = metadata;
  const screenshotFolder = `/tmp/${sha1}`;

  debug(`\t开始生成文件 ${file.name} 预览图`);

  mkdirp(screenshotFolder, err => {
    if (err) return reject(err);
    resolve({ ftpClient, file, debug, metadata, screenshotFolder });
  });
})

  .then(({ ftpClient, file, debug, metadata, screenshotFolder }) => new Promise((resolve, reject) => {
    let screenshots = [];

    ffmpeg(path.join('/tmp', file.name))
      .screenshots({
        timestamps: ['0%', '25%', '50%', '75%', '99%'],
        folder: screenshotFolder,
        filename: '%b-%r-%s.png'
      })
      .on('filenames', names => screenshots = names.map(name => path.join(screenshotFolder, name)))
      .on('end', () => resolve({ ftpClient, file, debug, metadata, screenshots }))
      .on('error', reject);
  }))

  // pick exist screenshots
  .then(({ ftpClient, file, debug, metadata, screenshots }) => new Promise((resolve, reject) => {
    mapLimit(screenshots, 5, (screenshot, cb) => {
      fs.access(screenshot, err => cb(null, err ? null : screenshot));
    }, (err, screenshots) => {
      if (err) return reject(err);
      resolve({
        ftpClient, file, debug, metadata,
        screenshots: _.compact(screenshots)
      });
    });
  }))

  .then(({ ftpClient, file, debug, metadata, screenshots: originalScreenshots }) => new Promise((resolve, reject) => {
    mapLimit(originalScreenshots, 5, (screenshot, cb) => {
      const basename = path.basename(screenshot, path.extname(screenshot));
      const outname = path.join(path.dirname(screenshot), `${basename}.jpg`);

      exec(`convert -resize "800>" ${screenshot} ${outname}`, err => {
        cb(err, outname);
      });
    }, (err, screenshots) => {
      if(err) return reject(err);
      resolve({ ftpClient, file, debug, metadata, screenshots, originalScreenshots });
    });
  }))

  .then(({ ftpClient, file, debug, metadata, screenshots, originalScreenshots }) => new Promise((resolve, reject) => {
    exec(`rm -rf ${originalScreenshots.join(' ')}`, err => {
      if (err) return reject(err);
      resolve({ ftpClient, file, debug, metadata, screenshots });
    });
  }))

  .then(({ ftpClient, file, debug, metadata, screenshots }) => new Promise((resolve, reject) => {
    const destFolder = '/data/static/images/video';

    mkdirp(destFolder, err => {
      if (err) return reject(err);

      mapLimit(screenshots, 5, (screenshot, cb) => {
        Promise.resolve(screenshot)
          .then(screenshot => new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha1');
            const rs = fs.createReadStream(screenshot);

            rs.on('readable', () => {
              const data = rs.read();
              if (data) hash.update(data);
            });

            rs.on('end', () => {
              resolve({ screenshot, sha1: hash.digest('hex') });
            });

            rs.on('error', reject);
          }))

          // rename file
          .then(({ screenshot, sha1 }) => new Promise((resolve, reject) => {
            const extname = path.extname(screenshot);
            const dest = path.join(destFolder, `${sha1}${extname}`);
            exec(`mv ${screenshot} ${dest}`, err => {
              if (err) return reject(err);
              resolve(dest);
            });
          }))

          .then(screenshot => cb(null, screenshot))
          .catch(cb);
      }, (err, screenshots) => {
        if (err) return reject(err);
        debug(`\t完成生成文件 ${file.name} 预览图`);
        resolve({ ftpClient, file, debug, metadata, screenshots });
      });
    });
  }));

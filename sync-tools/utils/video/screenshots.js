const mapLimit = require('async/mapLimit');
const ffmpeg = require('fluent-ffmpeg');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

const fileUtils = require('../file');

const { exec } = require('child_process');

module.exports = filepath => Promise.resolve({
  filepath,
  folder: path.dirname(filepath)
})

  // screenshot from videos
  .then(({ filepath, folder }) => new Promise((resolve, reject) => {
    let screenshots = [];

    ffmpeg(filepath)
      .screenshots({
        timestamps: ['1%', '25%', '50%', '75%', '99%'],
        folder: folder,
        filename: '%r-%s.png'
      })
      .on('filenames', filenames => screenshots = filenames.map(filename => (
        path.join(folder, filename)
      )))
      .on('end', () => {
        screenshots = screenshots.filter(shot => fs.existsSync(shot));
        resolve({ filepath, folder, screenshots });
      })
      .on('error', reject);
  }))

  // convert screenshots size
  .then(({ filepath, folder, screenshots }) => new Promise((resolve, reject) => {
    mapLimit(screenshots, 1, (screenshot, cb) => {
      const basename = path.basename(screenshot, path.extname(screenshot));
      const outpath = path.join(folder, `${basename}.jpg`);

      exec(`convert -resize "800>" ${screenshot} ${outpath}`, err => {
        cb(err, outpath);
      });
    }, (err, screenshots) => {
      if (err) return reject(err);
      resolve({ filepath, folder, screenshots });
    });
  }))

  // rename
  .then(({ filepath, folder, screenshots }) => new Promise((resolve, reject) => {
    mapLimit(screenshots, 1, (screenshot, cb) => {
      fileUtils.genSha1(screenshot)
        .then(sha1 => {
          const extname = path.extname(screenshot);
          const outpath = path.join(folder, `${sha1}${extname}`);

          return fileUtils.rename(screenshot, outpath);
        })
        .then(screenshot => cb(null, screenshot))
        .catch(cb);
    }, (err, screenshots) => {
      if (err) return reject(err);
      resolve(screenshots);
    });
  }));

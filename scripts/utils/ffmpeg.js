const ffmpeg = require('fluent-ffmpeg');
const mkdirp = require('mkdirp');
const path = require('path');

const { TMP_FOLDER } = require('../../config');

exports.ffprobe = filepath => new Promise((resolve, reject) => {
  ffmpeg(filepath).ffprobe((err, metadata) => {
    if (err) return reject(err);
    resolve(metadata);
  });
});

exports.createScreenshots = (filepath, sha1) => new Promise((resolve, reject) => {
  const folder = path.join(TMP_FOLDER, sha1);

  mkdirp(folder, err => {
    if (err) return reject(err);
    resolve({ filepath, folder });
  });
})

  .then(({ filepath, folder }) => new Promise((resolve, reject) => {
    let screenshots = [];

    ffmpeg(filepath)
      .screenshots({
        timestamps: ['0%', '25%', '50%', '75%', '99%'],
        folder,
        filename: '%r-%s.png'
      })
      .on('filenames', filenames => filenames.forEach(filename => (
        screenshots.push(path.join(folder, name))
      )))
      .on('end', () => resolve({ filepath, folder, screenshots }))
      .on('error', reject);
  }))

  // pick exists screenshots
  .then(args => {
    let { screenshots } = args;

    screenshots.filter(screenshot => fs.existsSync(screenshot));

    return args;
  })

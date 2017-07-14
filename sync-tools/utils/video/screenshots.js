const ffmpeg = require('fluent-ffmpeg');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

module.exports = filepath => Promise.resolve({
  filepath,
  folder: path.dirname(filepath)
})

  .then(({ filepath, folder }) => new Promise((resolve, reject) => {
    const screenshots = [];

    ffmpeg(filepath)
      .on('progress', progress => {
        debug(`[截图进度: ${progress.percent.toFixed(2)}% 完成`);
      })
      .on('filenames', filenames => filenames.forEach(filename => {
        const screenshot = path.join(folder, filename);

        if (fs.existsSync(screenshot)) {
          screenshots.push(screenshot);
        }
      }))
      .on('end', () => resolve({ filepath, folder, screenshots }))
      .on('error', reject);
  }))

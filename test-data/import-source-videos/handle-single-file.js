const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');
const _ = require('lodash');

const globalMixins = require('../../utils/global-mixins');
const { exec } = require('child_process');
const SourceVideo = require('../../models/SourceVideo');
const config = require('../../config');
const handleSingleFileScreenshots = require('./handle-single-file-screenshots');

module.exports = ({ ftpClient, file, debug }) => new Promise((resolve, reject) => {
  let src = path.join(config.ftpServer.folder, file.name);
  let dest = path.join('/tmp', file.name);

  debug(`正在处理 "${file.name}"`);
  debug(`\t正在下载文件 "${file.name}"`);

  ftpClient.get(src, (err, stream) => {
    if (err) return reject(err);

    stream.once('close', () => {
      debug(`\t完成下载文件 "${file.name}"`);
      resolve({ ftpClient, file, debug, metadata: { size: file.size } });
    });
    stream.pipe(fs.createWriteStream(dest));
  });
})

  //  Generate Sha1
  .then(({ ftpClient, file, debug, metadata }) => new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    const rs = fs.createReadStream(path.join('/tmp', file.name));

    debug(`\t正在计算文件 "${file.name}" SHA1 值`);

    rs.on('readable', () => {
      const data = rs.read();
      if (data) hash.update(data);
    });

    rs.on('end', () => {
      debug(`\t完成计算文件 "${file.name}" SHA1 值`);
      Object.assign(metadata, { sha1: hash.digest('hex') });
      resolve({ ftpClient, file, debug, metadata });
    });

    rs.on('error', reject);
  }))

  // Generate Metadata
  .then(({ ftpClient, file, debug, metadata }) => new Promise((resolve, reject) => {
    const dest = path.join('/tmp', file.name);

    debug(`\t正在读取文件 "${file.name}" 元信息`);

    ffmpeg(dest).ffprobe((err, data) => {
      if (err) return reject(err);

      let { date: uploadAt } = file;
      let { width, height, duration } = data.streams.filter(s => s.codec_type == 'video')[0];
      duration = +moment.duration(duration, 's');
      uploadAt = +moment(uploadAt);

      debug(`\t完成读取文件 "${file.name}" 元信息`);
      Object.assign(metadata, { width, height, duration, uploadAt });
      resolve({ ftpClient, file, debug, metadata });
    });
  }))

  // Generate Screenshots
  .then(handleSingleFileScreenshots)

  // Remove Tmp File
  .then(({ ftpClient, file, debug, metadata, screenshots }) => new Promise((resolve, reject) => {
    debug(`\t正在删除文件 "${file.name}"`);
    exec(`rm -rf $(printf "%q" "${path.join('/tmp', file.name)}")`, err => {
      if (err) return reject(err);
      debug(`\t完成删除文件 "${file.name}"`);
      debug(`完成处理 "${file.name}"`);
      resolve({
        filename: file.name,
        metadata,
        screenshots
      });
    });
  }))

  .then(({ filename, metadata, screenshots }) => ({
    filename,
    metadata,
    screenshots: screenshots.map(screenshot => (
      screenshot.replace(`${path.sep}data`, '')
    ))
  }))

  .then(({ filename, metadata, screenshots }) => {
    let { sha1, size, width, height, duration, uploadAt } = metadata;
    let filepath = `/${config.ftpServer.folder}/${filename}`;
    let query = { sha1 };
    let doc  = {
      $setOnInsert: {
        filename, filepath, sha1, size, width, height, duration, screenshots,
        uploadAt: moment(uploadAt).toDate()
      }
    };
    let opts = { new: true, upsert: true, setDefaultsOnInsert: true };

    return SourceVideo.findOneAndUpdate(query, doc, opts);
  })

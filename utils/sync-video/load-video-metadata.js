const mapLimit = require('async/mapLimit');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');
const _ = require('lodash');

const { exec } = require('child_process');
const debug = require('debug')('syncVideo');
const config = require('../../config');
const FOLDER = config.ftpServer.folder;

const downloadFile = (client, file) => new Promise((resolve, reject) => {
  const src = path.join(FOLDER, file.name);
  const dest = path.join('/tmp', file.name);

  debug(`正在下载 MP4 文件 "${file.name}"`);

  client.get(src, (err, stream) => {
    if (err) return reject(err);

    stream.once('close', () => {
      debug(`已经下载 MP4 文件 "${file.name}"`);
      resolve({ file, metadata: { size: file.size } });
    });
    stream.pipe(fs.createWriteStream(dest));
  });
});

const loadVideoMetadata = ({ file, metadata }) => new Promise((resolve, reject) => {
  const dest = path.join('/tmp', file.name);

  debug(`正在读取 MP4 文件 "${file.name}" 元信息`);
  ffmpeg(dest).ffprobe((err, data) => {
    if (err) return reject(err);

    let { width, height, duration } = data.streams.filter(s => s.codec_type == 'video')[0];
    duration = +moment.duration(duration, 's');

    debug(`已经读取 MP4 文件 "${file.name}" 元信息`);
    resolve({
      metadata: Object.assign(metadata, { width, height, duration }),
      file
    });
  });
});

const loadVideoSha1 = ({ file, metadata }) => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha1');
  const input = fs.createReadStream(path.join('/tmp', file.name));

  input.on('readable', () => {
    const data = input.read();
    if (data) hash.update(data);
  });

  input.on('end', () => {
    const sha1 = hash.digest('hex');
    Object.assign(metadata, { sha1 });
    resolve({ file, metadata });
  });

  input.on('error', err => reject(err));
});

const removeTmpVideo = ({ file, metadata }) => new Promise((resolve, reject) => {
  debug(`正在删除 MP4 文件 "${file.name}"`);
  exec(`rm -rf ${path.join('/tmp', file.name)}`, err => {
    if (err) return reject(err);
    debug(`已经删除 MP4 文件 "${file.name}"`);
    resolve(metadata);
  });
});


module.exports = (client, list) => new Promise((resolve, reject) => {
  mapLimit(list, 1, (file, cb) => {
    downloadFile(client, file)
      .then(loadVideoMetadata)
      .then(loadVideoSha1)
      .then(removeTmpVideo)
      .then(metadata => cb(null, metadata))
      .catch(err => cb(err));
  }, (err, results) => {
    if (err) return reject(err);

    let videoPaths = results.map(v => v.videoPath).join(' ');
    resolve(results);
  })
});

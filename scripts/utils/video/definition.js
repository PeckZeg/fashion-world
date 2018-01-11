const ffmpeg = require('fluent-ffmpeg');
const uuid = require('uuid/v4');
const path = require('path');
const debug = require('debug')('definition');

const fileUtils = require('../file');
const genVideoMetadata = require('./metadata');

const { TMP_FOLDER } = require('../../../config');

const genArgs = definition => {
  let videoBitrate = null;
  let size = null;

  switch (definition) {
    case '1080p':
    case 1080:
      videoBitrate = '3072k';
      size = '?x1080';
      break;

    case '720p':
    case 720:
      videoBitrate = '1536k';
      size = '?x720';
      break;

    case '480p':
    case 480:
      videoBitrate = '768k';
      size = '?x480';
      break;

    case '360p':
    case 360:
    default:
      videoBitrate = '386k';
      size = '?x360';
  }

  return { videoBitrate, size };
};

module.exports = (filepath, definition = '360p', destFolder = '/tmp') => new Promise((resolve, reject) => {
  const outputPath = path.join(destFolder, `${uuid()}.mp4`);
  const { videoBitrate, size } = genArgs(definition);

  ffmpeg(filepath)
    .audioCodec('libfdk_aac')
    .videoCodec('libx264')
    .videoBitrate(videoBitrate)
    .size(size).autopad()
    .on('progress', progress => {
      debug(`[${definition}] 转换进度: ${progress.percent.toFixed(2)}% - ${path.basename(filepath)}`);
    })
    .on('error', reject)
    .on('end', () => resolve(outputPath))
    .save(outputPath);
})

  // generate sha1
  .then(filepath => (
    fileUtils.genSha1(filepath).then(sha1 => ({ filepath, sha1 }))
  ))

  // generate size
  .then(({ filepath, sha1 }) => (
    fileUtils.size(filepath).then(size => ({ filepath, sha1, size }))
  ))

  // rename file
  .then(({ filepath, sha1, size }) => {
    const extname = path.extname(filepath);
    const filename = `${sha1}${extname}`;
    const destpath = path.join(destFolder, filename);

    return fileUtils.rename(filepath, destpath).then(filepath => ({
      filepath, filename, sha1, size
    }));
  })

  // generate metadata
  .then(({ filepath, filename, sha1, size }) => (
    genVideoMetadata(filepath).then(metadata => ({
      filepath,
      filename,
      definition,
      sha1,
      size,
      metadata
    }))
  ));

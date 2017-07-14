const mapLimit = require('async/mapLimit');
const path = require('path');

const globalMixins = require('../utils/global-mixins');
const videoUtils = require('./utils/video');
const fileUtils = require('./utils/file');

const TEST_FILE_PATH = path.join('/tmp', '巴黎内衣秀2017-Monamourshow-2.mp4');
const VIDEO_DEFINITIONS = ['1080p', '720p', '480p', '360p'];
// const VIDEO_DEFINITIONS = ['360p'];

Promise.resolve(TEST_FILE_PATH)

  // generate file sha1
  .then(filepath => (
    fileUtils.genSha1(filepath)
      .then(sha1 => ({ filepath, sha1 }))
  ))

  // load file metadata
  .then(({ filepath, sha1 }) => (
    videoUtils.metadata(filepath)
      .then(metadata => ({ filepath, sha1, metadata }))
  ))

  // move & rename file
  .then(({ filepath, sha1, metadata }) => (
    fileUtils.copy(
      filepath,
      path.join('/tmp', sha1, path.basename(filepath))
    )
      .then(filepath => ({ filepath, sha1, metadata }))
  ))

  .then(({ filepath, sha1, definition }) => new Promise((resolve, reject) => {
    const destFolder = path.dirname(filepath);

    mapLimit(VIDEO_DEFINITIONS, 1, (definition, cb) => {
      videoUtils.toDefinition(filepath, definition, destFolder)
        .then(definition => cb(null, definition))
        .catch(cb);
    }, (err, definitions) => {
      if (err) return reject(err);
      resolve({ filepath, definitions });
    });
  }))

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

const mapLimit = require('async/mapLimit');
const path = require('path');

const globalMixins = require('../utils/global-mixins');
const syncUtils = require('./utils');

const VIDEO_DEFINITIONS = ['1080p', '720p', '480p', '360p'];

module.exports = filepath => Promise.resolve(filepath)

  // generate video sha1
  .then(filepath => (
    syncUtils.file.genSha1(filepath).then(sha1 => ({ filepath, sha1 }))
  ))

  // load video metadata
  .then(({ filepath, sha1 }) => (
    syncUtils.video.metadata(filepath)
      .then(metadata => ({ filepath, sha1, metadata }))
  ))

  // move & rename file
  .then(({ filepath, sha1, metadata }) => (
    syncUtils.file.copy(
      filepath,
      path.join('/tmp', sha1, path.basename(filepath))
    )
      .then(filepath => ({ filepath, sha1, metadata }))
  ))

  // generate each definition video
  .then(({ filepath, sha1, metadata }) => new Promise((resolve, reject) => {
    const destFolder = path.dirname(filepath);

    mapLimit(VIDEO_DEFINITIONS, 1, (definition, cb) => {
      syncUtils.video.toDefinition(filepath, definition, destFolder)
        .then(definition => cb(null, definition))
        .catch(cb);
    }, (err, definitions) => {
      if (err) return reject(err);
      resolve({ filepath, sha1, metadata, definitions });
    });
  }))

  // generate video screenshots
  .then(({ filepath, sha1, metadata, definitions }) => (
    syncUtils.video.screenshots(
      definitions.filter(({ definition }) => definition == '1080p')[0].filepath
    ).then(screenshots => ({
      filepath,
      sha1,
      metadata,
      definitions,
      screenshots
    }))
  ))

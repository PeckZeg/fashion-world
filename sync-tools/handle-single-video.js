const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../utils/global-mixins');
const syncUtils = require('./utils');
const uploadVideoScreenshots = require('./upload-video-screenshots');
const uploadVideoDefinitions = require('./upload-video-definitions');

const VIDEO_DEFINITIONS = ['1080p', '720p', '480p', '360p'];
const DEFINITION_VIDEO_SCREENSHOT = '1080p';
// const VIDEO_DEFINITIONS = ['360p'];
// const DEFINITION_VIDEO_SCREENSHOT = '360p';

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
  .then(({ filepath, sha1, metadata, definitions }) => {
    debug(`正在生成视频截图 ${filepath}`);
    return syncUtils.video.screenshots(
      definitions.filter(({ definition }) => (
        definition == DEFINITION_VIDEO_SCREENSHOT
      ))[0].filepath
    ).then(screenshots => ({
      filepath,
      sha1,
      metadata,
      definitions,
      screenshots
    }));
  })

  // upload screenshots
  .then(({ filepath, sha1, metadata, definitions, screenshots }) => {
    debug(`正在上传视频截图`);
    return uploadVideoScreenshots(screenshots)
      .then(screenshots => ({
        filepath,
        sha1,
        metadata,
        definitions,
        screenshots
      }));
  })

  // upload definitions
  .then(({ filepath, sha1, metadata, definitions, screenshots }) => (
    uploadVideoDefinitions(definitions)
      .then(definitions => ({
        filepath,
        sha1,
        metadata,
        definitions,
        screenshots
      }))
  ));

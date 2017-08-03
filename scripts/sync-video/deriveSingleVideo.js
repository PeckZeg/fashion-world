const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const syncUtils = require('../utils');

const uploadDefinitionVideo = require('./uploadDefinitionVideo');
const uploadImages = require('./uploadImages');

const { TMP_FOLDER } = require('./config');
// const VIDEO_DEFINITIONS = ['1080p', '720p', '480p', '360p'];
// const DEFINITION_VIDEO_SCREENSHOT = '1080p';
const VIDEO_DEFINITIONS = ['360p'];
const DEFINITION_VIDEO_SCREENSHOT = '360p';

module.exports = filepath => Promise.resolve(filepath)

  // gen each definition video
  .then(filepath => new Promise((resolve, reject) => {
    const destFolder = path.dirname(filepath);

    mapLimit(VIDEO_DEFINITIONS, 1, (definition, cb) => {
      syncUtils.video.toDefinition(filepath, definition, destFolder)
        .then(definition => cb(null, definition))
        .catch(cb);
    }, (err, definitions) => {
      if (err) return reject(err);
      resolve({ filepath, definitions });
    });
  }))

  // gen video screenshots
  .then(({ filepath, definitions }) => {
    debug(`正在生成视频截图 ${path.basename(filepath)}`);
    return syncUtils.video.screenshots(
      definitions.filter(({ definition }) => (
        definition == DEFINITION_VIDEO_SCREENSHOT
      ))[0].filepath
    ).then(screenshots => ({
      filepath,
      definitions,
      screenshots
    }));
  })

  // upload definition videos
  .then(({ filepath, definitions, screenshots }) => (
    uploadDefinitionVideo(definitions)
      .then(definitions => ({ filepath, definitions, screenshots }))
  ))

  // upload screenshots
  .then(({ filepath, definitions, screenshots }) => (
    uploadImages(screenshots)
      .then(screenshots => ({
        definitions,
        screenshots
      }))
  ));

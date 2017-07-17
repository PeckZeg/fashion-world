const mapLimit = require('async/mapLimit');
const path = require('path');

const globalMixins = require('../utils/global-mixins');
const handleSingleVideo = require('./handle-single-video');
const videoUtils = require('./utils/video');
const fileUtils = require('./utils/file');

const TEST_FILE_PATH = path.join('/tmp', '巴黎内衣秀2017-Monamourshow-2.mp4');
const VIDEO_DEFINITIONS = ['1080p', '720p', '480p', '360p'];
// const VIDEO_DEFINITIONS = ['360p'];

handleSingleVideo(TEST_FILE_PATH)

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

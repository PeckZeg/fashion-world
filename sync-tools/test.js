const mapLimit = require('async/mapLimit');
const path = require('path');

const globalMixins = require('../utils/global-mixins');
const handleSingleVideo = require('./handle-single-video');

const TEST_FILE_PATH = path.join('/tmp', '短片2017-Sexy-AlexandrePeccin-FrancielePerao.mp4');

handleSingleVideo(TEST_FILE_PATH)

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

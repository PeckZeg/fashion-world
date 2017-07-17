const path = require('path');

const globalMixins = require('../utils/global-mixins');
const videoUtils = require('./utils/video');

const TEST_FILE_PATH = '/tmp/a840c389ce27432659293fd77fb9b7a7adb45453/5e920588f94e8bc9fd6910e5322669b330675f6b.mp4';

videoUtils.screenshots(TEST_FILE_PATH)

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

const globalMixins = require('../../utils/global-mixins');

const syncUtils = require('../utils');

const TEST_FILE = '/tmp/DEEP02.mp4';

syncUtils.video.metadata(TEST_FILE)

  .then(metadata => {
    console.log({ metadata });
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

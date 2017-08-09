const globalMixins = require('../../utils/global-mixins');
const syncUtils = require('../utils');

syncUtils.file.copy('/tmp/123.mp4', '/tmp/test/321.mp4')

  .then(filepath => {
    console.log(filepath);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

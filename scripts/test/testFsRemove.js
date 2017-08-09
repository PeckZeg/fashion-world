const globalMixins = require('../../utils/global-mixins');
const syncUtils = require('../utils');

syncUtils.file.remove('/tmp/test')

  .then(filepath => {
    console.log('sucess');
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

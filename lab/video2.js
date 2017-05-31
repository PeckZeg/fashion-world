const globalMixins = require('../utils/global-mixins');
const Video = require('../models/Video');

Video
  .find()
  .skip(0)
  .limit(20)
  .exec()
  .then(videos => {
    console.log(videos);
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  })

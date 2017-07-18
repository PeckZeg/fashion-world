const globalMixins = require('../../utils/global-mixins');

const loadFtpVideoList = require('./load-ftp-video-list');

const FTP_FOLDER = '/WineLife_Channel_1080P/2017_07_17';

loadFtpVideoList(FTP_FOLDER)
  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

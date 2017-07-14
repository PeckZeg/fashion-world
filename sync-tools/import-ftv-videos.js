const FtpClient = require('ftp');
const debug = require('debug')('sync');

const globalMixins = require('../utils/global-mixins');
const createCredisClient = reqlib('./redis/create-client');
const fetchVideoList = require('./fetch-ftv-video-list');
const saveToCache = require('./save-to-cache');

const {
  lanConnect: FTP_CONNECT_PARAMS,
  folders: {
    ftv: FTP_FTV_FOLDER
  }
} = config.ftpServer;

fetchVideoList()

  // save to cache
  .then(saveToCache)

  // log
  .then(files => {
    console.log(_.sample(files));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

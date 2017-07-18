const globalMixins = require('../../utils/global-mixins');
const createRedisClient = reqlib('./redis/create-client');

const loadFtpVideoHashList = require('./load-ftp-video-hash-list');

const { SYNC_FLAG_CACHE_KEY } = require('./config');
const HASH_FILE = '/WineLife_Channel_1080P/2017_07_17/hash_list.txt';

loadFtpVideoHashList(HASH_FILE)
  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

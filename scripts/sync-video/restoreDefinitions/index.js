const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');

const globalMixins = require('../../../utils/global-mixins');
const handleEachConnect = require('./handleEachConnect');

const opts = { sha1: true };
const CONNECTIONS = [
  // {
  //   id: 'Deep',
  //   connect: config.ftpServer.fashionWorld,
  //   folders: [
  //     '/DEEP/1080p/2017-07-12',
  //     '/DEEP/1080p/2017-08-15'
  //   ],
  //   opts
  // },
  // {
  //   id: 'WLC',
  //   connect: config.ftpServer.fashionWorld,
  //   folders: [
  //     '/WLC/WineLife_Channel_1080P/2017_07_17'
  //   ],
  //   opts
  // },
  // {
  //   id: 'Fashion TV',
  //   connect: config.ftpServer.fashiontv,
  //   folders: [
  //     '/FTV',
  //     '/FTV/FASHIONWORLD-APP视频筛选002'
  //   ],
  //   opts
  // },
];
const HASH_FILE = 'hash_list.txt';

new Promise((resolve, reject) => {
  mapLimit(CONNECTIONS, 1, (connection, cb) => {
    const { id, connect, folders, opts } = connection;
    handleEachConnect(id, folders, connect, opts)
      .then(result => cb(null, result))
      .catch(cb);
  }, (err, result) => !err ? resolve(result) : reject(err));
})

  .then(result => {
    // console.log(result.length);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

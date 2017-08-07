const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../../../utils/global-mixins');
const handleSingleFolder = require('./handleSingleFolder');

const FOLDERS = [
  '/FTV',
  '/FTV/FASHIONWORLD-APP视频筛选002'
];
const HASH_FILE = 'hash_list.txt';

new Promise((resolve, reject) => {
  mapLimit(FOLDERS, 1, (folderpath, cb) => {
    handleSingleFolder(folderpath, HASH_FILE)
      .then(result => cb(null, result))
      .catch(cb);
  }, (err, results) => {
    if (err) return reject(err);
    resolve(results);
  });
})

  .then(result => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

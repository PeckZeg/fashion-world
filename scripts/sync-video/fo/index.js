const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../../../utils/global-mixins');
const handleEachFolder = require('./handleEachFolder');

const FOLDERS = [
  '/FashionOne/文件编号001/2016年10月24日收到Fashionone'
];
const HASH_FILE = 'hash_list.txt';

new Promise((resolve, reject) => {
  mapLimit(FOLDERS, 1, (folderpath, cb) => {
    handleEachFolder(folderpath, HASH_FILE)
      .then(result => cb(null, result))
      .catch(cb);
  }, (err, results) => !err ? resolve(results) : reject(err));
});

const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const colors = require('colors/safe');
const path = require('path');

const handleEachFolder = require('./handleEachFolder');
const HASH_FILE = 'hash_list.txt';

module.exports = (id, folders, connectOpts, opts = {}) => new Promise((resolve, reject) => {
  debug(`正在处理 ${colors.blue(id)} - 共计 ${folders.length} 个文件夹`);
  mapLimit(folders, 1, (folder, cb) => {
    debug(`正在处理文件夹 ${colors.blue(id)} - ${folder}`);
    handleEachFolder(folder, HASH_FILE, connectOpts, opts)
      .then(result => cb(null, result))
      .catch(cb);
  }, (err, result) => {
    !err ? resolve(result) : reject(err);
  });
});

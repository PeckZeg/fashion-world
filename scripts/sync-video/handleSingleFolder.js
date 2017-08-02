const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');
const loadFtpVideoList = require('./loadFtpVideoList');
const loadFtpVideoHashList = require('./loadFtpVideoHashList');

module.exports = (folderpath, hashFile) => {
  debug(`>>> 即将同步视频文件夹 ${folderpath}`);

  return loadFtpVideoList(folderpath)
    .then(ftpVideoList => (
      loadFtpVideoHashList(path.join(folderpath, hashFile))
        .then(ftpVideoHashList => ({
          ftpVideoList,
          ftpVideoHashList
        }))
    ));
};

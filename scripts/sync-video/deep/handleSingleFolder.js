const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');

const handleSingleFolder = require('../handleSingleFolder');
const handleSingleSource = require('./handleSingleSource');

module.exports = (folderpath, hashFile) => {
  return handleSingleFolder(folderpath, hashFile)

    // handle each source
    .then(sources => new Promise((resolve, reject) => {
      debug(`正在将各个源视频转换为视频，共计 ${sources.length} 个`);
      mapLimit(sources, 1, (source, cb) => {
        debug(`正在转换源视频 ${sources.indexOf(source) + 1}: ${source._id}`);
        handleSingleSource(source)
          .then(video => cb(null, video))
          .catch(cb);
      }, (err, videos) => {
        if (err) return reject(videos);
        resolve(videos);
      });
    }))
};

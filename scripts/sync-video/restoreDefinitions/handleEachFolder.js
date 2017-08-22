const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const loadFtpVideoList = require('../loadFtpVideoList');
const loadFtpVideoHashList = require('../loadFtpVideoHashList');
const handleEachVideo = require('./handleEachVideo');

module.exports = (folderpath, hashFile, connectOpts, opts = {}) => {
  return loadFtpVideoList(folderpath, connectOpts)

    // load hash file
    .then(ftpVideoList => (
      loadFtpVideoHashList(path.join(folderpath, hashFile), connectOpts)
        .then(ftpVideoHashList => ({ ftpVideoList, ftpVideoHashList }))
    ))

    // merge `sha1` to video list
    .then(({ ftpVideoList, ftpVideoHashList }) => {
      const videosBySha1 = _.keyBy(ftpVideoHashList, 'name');

      const videos = ftpVideoList.map(video => {
        const { sha1 } = videosBySha1[video.name] || {};
        return { ...video, sha1 };
      }).sort((a, b) => a.size - b.size).slice(0, 1)

      if (opts.sha1) {
        return videos.filter(video => video.sha1);
      }

      return videos;
    })

    // handle each video file
    .then(videos => new Promise((resolve, reject) => {
      debug(`>>> 即将同步视频文件夹 ${folderpath}，共计 ${videos.length} 个视频`);
      mapLimit(videos, 1, (video, cb) => {
        handleEachVideo(video, connectOpts)
          .then(result => cb(null, result))
          .catch(cb);
      }, (err, result) => {
        !err ? resolve(result) : reject(err);
      });
    }))
};

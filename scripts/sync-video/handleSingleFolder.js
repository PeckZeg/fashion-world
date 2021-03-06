const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');
const loadFtpVideoList = require('./loadFtpVideoList');
const loadFtpVideoHashList = require('./loadFtpVideoHashList');
const handleSingleVideo = require('./handleSingleVideo');

module.exports = (folderpath, hashFile, connectOpts, opts = {}) => {
  debug(`>>> 即将同步视频文件夹 ${folderpath}`);

  return loadFtpVideoList(folderpath, connectOpts)

    // .then(ftpVideoList => {
    //   console.log(ftpVideoList);
    //   return ftpVideoList;
    // })

    // load hash file
    .then(ftpVideoList => (
      loadFtpVideoHashList(path.join(folderpath, hashFile), connectOpts)
        .then(ftpVideoHashList => ({
          ftpVideoList,
          ftpVideoHashList
        }))
    ))

    // merge `sha1` to video list
    .then(({ ftpVideoList, ftpVideoHashList }) => {
      const videosBySha1 = _.keyBy(ftpVideoHashList, 'name');

      ftpVideoList = ftpVideoList.map(video => {
        const { sha1 } = videosBySha1[video.name] || {};
        return { ...video, sha1 };
      });

      if (opts.sha1) {
        ftpVideoList = ftpVideoList.filter(video => video.sha1);
      }

      return ftpVideoList;
    })

    // handle each ftp video
    .then(ftpVideoList => new Promise((resolve, reject) => {
      debug(`即将同步视频列表，共计 ${ftpVideoList.length} 个视频`);
      mapLimit(ftpVideoList, 1, (ftpVideo, cb) => {
        handleSingleVideo(ftpVideo, connectOpts)
          .then(video => cb(null, video))
          .catch(cb);
      }, (err, videos) => {
        if (err) return reject(err);
        debug(`同步视频完成，共计同步 ${ftpVideoList.length} 个视频`);
        resolve(videos);
      });
    }));
};

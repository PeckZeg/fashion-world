const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');

const FOLDER = '/WLC/WineLife_Channel_1080P/2017_07_17';
const HASH_FILE = 'hash_list.txt';

const loadFtpVideoList = require('./load-ftp-video-list');
const loadFtpHashVideoList = require('./load-ftp-video-hash-list');
const handleSingleVideo = require('./handle-single-video');

debug(`>>> 同步 WLC 视频: ${FOLDER}`);

loadFtpVideoList(FOLDER)

  .then(ftpVideos => (
    loadFtpHashVideoList(path.join(FOLDER, HASH_FILE))
      .then(ftpHashVideos => ({ ftpVideos, ftpHashVideos }))
  ))

  .then(({ ftpVideos, ftpHashVideos }) => {
    ftpHashVideos = _.keyBy(ftpHashVideos, 'filename');
    ftpVideos = ftpVideos.map(video => {
      const { sha1 } = ftpHashVideos[video.name] || {};
      return { ...video, sha1 };
    });

    return ftpVideos;
  })

  .then(ftpVideos => new Promise((resolve, reject) => {
    debug(`即将同步视频列表，共计 ${ftpVideos.length} 个视频`);
    mapLimit(ftpVideos, 1, (ftpVideo, cb) => {
      handleSingleVideo(ftpVideo)
        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      if (err) return reject(err);
      resolve(videos);
    });
  }))

  .then(result => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

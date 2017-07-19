const mapLimit = require('async/mapLimit');
const path = require('path');

const globalMixins = require('../../utils/global-mixins');

const FTP_FOLDER = '/WineLife_Channel_1080P/2017_07_17';
const FTP_FOLDER_HASH_FILE = path.join(FTP_FOLDER, 'hash_list.txt');
const CSV_FILE = path.join(__dirname, 'csv/20170717.csv');

const loadFtpVideoList = require('./load-ftp-video-list');
const loadFtpHashVideoList = require('./load-ftp-video-hash-list');
const loadSyncList = require('./load-sync-list');
const handleSingleVideoId = require('./handle-single-videoId');

loadFtpVideoList(FTP_FOLDER)
  .then(ftpVideos => (
    loadFtpHashVideoList(FTP_FOLDER_HASH_FILE)
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

  .then(ftpVideos => (
    loadSyncList(CSV_FILE).then(videoIds => ({ ftpVideos, videoIds }))
  ))

  .then(({ ftpVideos, videoIds }) => new Promise((resolve, reject) => {
    videoIds = videoIds.slice(0, 1);

    mapLimit(videoIds, 1, (videoId, cb) => {
      handleSingleVideoId(videoId, ftpVideos)
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
  });

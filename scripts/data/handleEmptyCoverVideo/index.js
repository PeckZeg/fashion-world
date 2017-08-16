const mapLimit = require('async/mapLimit');
const debug = require('debug')('data');

const globalMixins = require('../../../utils/global-mixins');
const handleVideo = require('./handleVideo');

const SourceVideo = reqlib('./models/SourceVideo');
const Video = reqlib('./models/Video');

Video.find({ cover: null })

  .then(videos => new Promise((resolve, reject) => {
    debug(`共查询到空封面的视频共计 ${videos.length} 个`);
    mapLimit(videos, 1, (video, cb) => {
      debug(`正在处理视频 #${videos.indexOf(video) + 1} ${video._id}`);

      handleVideo(video)
        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      err ? reject(err) : resolve(videos);
    });
  }))

  .then(videos => {
    debug(`所有空封面的视频处理完毕，共计 ${videos.length} 个`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

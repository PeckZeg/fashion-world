const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');

const globalMixins = require('../utils/global-mixins');

const Video = reqlib('./models/Video');
const SourceVideo = reqlib('./models/SourceVideo');


Video.find(null, 'sourceId')

  // .then(videos => _.map(videos, 'sourceId'))

  .then(videos => new Promise((resolve, reject) => {
    debug(`共查询到视频数量 ${videos.length}，即将开始清理`);
    mapLimit(videos, 1, (video, cb) => {
      SourceVideo.findById(video.sourceId)
        .then(source => {
          if (source) {
            cb(null, null);
          }

          else {
            debug(`开始处理视频 ${video._id}`);
            Video.findByIdAndRemove(video._id)
            .then(result => cb(null, true))
            .catch(cb);
          }
        })
        .catch(cb);
    }, (err, sources) => {
      const total = _.compact(sources).length;
      debug(`处理完毕，共处理了 ${total} 个视频。`);
      err ? reject(err) : resolve(total);
    });
  }))

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

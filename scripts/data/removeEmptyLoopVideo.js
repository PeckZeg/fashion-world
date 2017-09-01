const mapLimit = require('async/mapLimit');
const debug = require('debug')('data');

const globalMixins = require('../../utils/global-mixins');

const LoopVideo = reqlib('./models/LoopVideo');
const Video = reqlib('./models/Video');

let o = {};

o.map = function () { emit(this.videoId, 1); }
o.reduce = function (k, vals) { return vals.length; }

LoopVideo.mapReduce(o)

  .then(videoIds => {
    debug(`获取循环视频，共计 ${videoIds.length} 个`);
    return videoIds.map(result => result._id);
  })

  .then(videoIds => (
    Video.find({ _id: { $in: videoIds } }, '_id')
      .then(videos => {
        debug(`获取已存在的视频，共计 ${videos.length} 个`);
        return videos.map(video => video._id.toString());
      })
      .then(totalVideoIds => ({ videoIds, totalVideoIds }))
  ))

  .then(({ videoIds, totalVideoIds }) => {
    let emptyVideos = [];

    videoIds.forEach(videoId => {
      if (!totalVideoIds.includes(videoId.toString())) {
        emptyVideos.push(videoId);
      }
    });

    return emptyVideos;
  })

  .then(emptyVideoIds => new Promise((resolve, reject) => {
    debug(`即将处理不存在的视频编号，共计 ${emptyVideoIds.length} 个`);
    mapLimit(emptyVideoIds, 1, (videoId, cb) => {
      LoopVideo.remove({ videoId })
        .then(() => cb(null, videoId))
        .catch(cb);
    }, (err, result) => {
      !err ? resolve(result) : reject(err);
    });
  }))

  .then(result => {
    debug(`全部不存在的循环视频已移除，共计 ${result.length} 个`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

const mongoose = require('mongoose');
const mapLimit = require('async/mapLimit');
const debug = require('debug')('debug');

const globalMixins = require('../utils/global-mixins');

const Video = reqlib('./models/Video');

const { ObjectId } = mongoose.Types;

Video.count()

  // sample size
  .then(total => Math.floor(total / 2))

  // sample video
  .then(sample => (
    Video.aggregate().sample(sample)
      .then(videos => videos.map(video => new Video(video)))
  ))

  .then(videos => new Promise((resolve, reject) => {
    debug(`将要修改 ${videos.length} 个视频频道`);
    mapLimit(videos, 1, (video, cb) => {
      const channelId = ObjectId('5923d5a2afa4194436827736');
      const update = { $set: { channelId } };
      const opts = { new: true };

      Video.findByIdAndUpdate(video._id, update, opts)
        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      if (err) return reject(err);
      debug(`所有视频频道修改完毕！共修改了 ${videos.length} 个视频`);
      resolve(videos);
    });
  }))

  .then(videos => {
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

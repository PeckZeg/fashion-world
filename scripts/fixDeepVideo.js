const mapLimit = require('async/mapLimit');
const Mock = require('mockjs');

const globalMixins = require('../utils/global-mixins');

const Video = reqlib('./models/Video');
const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');

const { Random } = Mock;

Video.find({
  $or: [
    { categoryId: null },
    { title: null }
  ]
})

  .then(videos => new Promise((resolve, reject) => {
    mapLimit(videos, 1, (video, cb) => {
      const { _id: videoId, channelId } = video;

      Category.aggregate().match({ channelId }).sample(1)
        .then(categories => new Category(categories[0])._id)
        .then(categoryId => ({
          categoryId,
          title: Random.ctitle(4, 32)
        }))
        .then($set => {
          const doc = { $set };
          const opts = { new: true };

          return Video.findByIdAndUpdate(videoId, doc, opts);
        })
        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      if (err) return reject(err);
      resolve(videos);
    });
  }))

  .then(videos => {
    videos = videos.map(video => video.toObject());
    console.log(JSON.stringify(videos, null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

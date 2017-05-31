const Mock = require('mockjs');
const path = require('path');
const moment = require('moment');
const mapLimit = require('async/mapLimit');

const globalMixins = require('../utils/global-mixins');
const SourceVideo = require('../models/SourceVideo');
const Video = require('../models/Video');
const Category = require('../models/VideoChannelCategory');
const VideoChannel = require('../models/VideoChannel');

SourceVideo.count()

  //  SourceVideo Count
  .then(count => SourceVideo.aggregate().sample(Math.floor(count / 2)))

  // Generate Video Models
  .then(sourceVideos => sourceVideos.map(sourceVideo => {
    let model = Mock.mock({
      'tags|1-8': ['@cword(2, 8)'],
      abstract: '@csentence(2, 32)',
      summary: '@cparagraph(1, 4)',
      cover: '/static/images/video/2e8cae4b2e177d502b94282ad2be79f8ab8e3ce6.png'
    });

    return Object.assign(model, {
      sourceId: sourceVideo._id,
      name: path.basename(sourceVideo.filename, path.extname(sourceVideo.filename)),
      publishAt: moment().toDate()
    });
  }))

  // Save Data
  .then(videos => new Promise((resolve, reject) => {
    mapLimit(videos, 5, (video, cb) => {
      let { sourceId } = video;
      let query = { sourceId };
      let doc = { $set: video };
      let opts = { new: true, upsert: true, setDefaultsOnInsert: true };

      Category.aggregate().sample(1)
        .then(category => {
          video.channelId = category[0].channelId;
          video.categoryId = category[0]._id;
          return Video.findOneAndUpdate(query, doc, opts);
        })

        .then(video => cb(null, video))
        .catch(cb);
    }, (err, videos) => {
      if (err) return reject(err);
      resolve(videos);
    });
  }))

  .then(results => {
    console.log({results});
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

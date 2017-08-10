const mapLimit = require('async/mapLimit');
const debug = require('debug')('data');
const Mock = require('mockjs');

const globalMixins = require('../../../utils/global-mixins');

const Video = reqlib('./models/Video');
const LoopVideo = reqlib('./models/LoopVideo');

const fetchImageList = require('./fetchImageList');
const createLoopVideo = require('./createLoopVideo');

const { Random } = Mock;

const argv = process.argv.slice(2);
const count = Number.isNaN(Number.parseInt(argv[0])) ? _.random(8, 32) : Number.parseInt(argv[0]);

// fetch ftp image list
fetchImageList()

  // sample videos
  .then(imageList => (
    Video.aggregate().sample(count)
      .then(videos => videos.map(video => new Video(video)))
      .then(videos => ({ imageList, videos }))
  ))

  // create loop videos
  .then(({ imageList, videos }) => new Promise((resolve, reject) => {
    debug(`开始创建循环视频，共计 ${videos.length} 个`);
    mapLimit(videos, 1, (video, cb) => {
      createLoopVideo(video, imageList)
        .then(loopVideo => loopVideo.save())
        .then(loopVideo => cb(null, loopVideo))
        .catch(cb);
    }, (err, loopVideos) => {
      err ? reject(err) : resolve(loopVideos);
    });
  }))

  .then(loopVideos => {
    debug(`所有循环视频已经创建，共计 ${loopVideos.length} 个`);
    console.log(JSON.stringify(_.sample(loopVideos), null, 2));
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

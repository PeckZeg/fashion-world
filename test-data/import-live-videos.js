const globalMixins = require('../utils/global-mixins');

const Mock = require('mockjs');
const moment = require('moment');
const mapLimit = require('async/mapLimit');
const debug = require('debug')('import');
const glob = require('glob');

const LiveVideo = reqlib('./models/LiveVideo');
const SourceVideo = reqlib('./models/SourceVideo');

const IMAGES = glob.sync('/data/static/images/video/*.jpg').map(image => image.replace('/data', ''));
const BEGIN_TIMESTAMP = +moment().add(-1, 'months').startOf('month');
const END_TIMESTAMP = +moment().add(1, 'months').endOf('month');

const randomDate = () => new Date(_.random(BEGIN_TIMESTAMP, END_TIMESTAMP));
const randomDate2 = () => new Date(_.random(BEGIN_TIMESTAMP, +new Date()));

const handleSingleLiveVideo = () => Promise.resolve(_.random(2, 6))
  .then(sample => SourceVideo.aggregate().sample(sample).exec())
  .then(sources => sources.map(source => new SourceVideo(source)))
  .then(sources => sources.map(source => source._id))
  .then(sourceIds => new LiveVideo({
    sourceIds,
    summary: Mock.mock('@cparagraph(2, 6)').split('。').join('。\n'),
    cover: _.sample(IMAGES),
    publishAt: Math.random() > 0.66 ? randomDate() : null,
    removeAt: Math.random() < 0.33 ? randomDate2() : null,
    ...Mock.mock({
      'tags|1-6': ['@cword(2, 5)'],
      'keywords|1-6': ['@cword(2, 5)'],
      name: '@ctitle(4, 16)',
      abstract: '@csentence(8, 64)',
      priority: '@integer(1, 64)'
    })
  }))
  .then(liveVideo => liveVideo.save());

Promise.resolve(+process.argv[1])
  .then(count => Number.isNaN(count) ? _.random(64, 128) : count)
  .then(count => _.range(count))
  .then(arr => new Promise((resolve, reject) => {
    debug(`准备生成 ${arr.length} 个 Live 视频`);
    mapLimit(arr, 1, (idx, cb) => {
      debug(`\t正在生成第 ${idx + 1} 个 Live 视频`);
      handleSingleLiveVideo()
        .then(liveVideo => cb(null, liveVideo))
        .catch(reject);
    }, (err, liveVideos) => {
      if (err) return reject(err);
      resolve(liveVideos);
    });
  }))

  .then(liveVideos => {
    debug(`Live 视频生成完毕，一共生成了 ${liveVideos.length} 个 Live 视频`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

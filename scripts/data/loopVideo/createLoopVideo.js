const debug = require('debug')('data');
const Mock = require('mockjs');

const genPublishAt = require('./genPublishAt');

const LoopVideo = reqlib('./models/LoopVideo');

const { Random } = Mock;

module.exports = (video, imageList) => Promise.resolve(video)

  // gen loop video
  .then(video => new LoopVideo({
    videoId: video._id,
    title: Random.ctitle(2, 32),
    subtitle: Random.ctitle(2, 32),
    abstract: Random.ctitle(4, 64),
    summary: Random.ctitle(4, 64),
    cover: _.sample(imageList),
    priority: Random.integer(0, 128),
    publishAt: genPublishAt()
  }))

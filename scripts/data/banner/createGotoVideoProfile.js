const debug = require('debug')('data');
const Mock = require('mockjs');

const Banner = reqlib('./models/Banner');
const Channel = reqlib('./models/Channel');
const Video = reqlib('./models/Video');

const genPublishAt = require('./genPublishAt');

const { Random } = Mock;

module.exports = imageList => Channel.aggregate().sample(1)

  // transform channel
  .then(channels => {
    if (!channels.length) {
      return Promise.reject(new Error('empty channels'));
    }

    return new Channel(channels[0]);
  })

  // sample video
  .then(channel => (
    Video.aggregate().sample(1)
      .then(videos => {
        if (!videos.length) {
          return Promise.reject(new Error('empty videos'));
        }

        return new Video(videos[0]);
      })
      .then(video => ({ channel, video }))
  ))

  // gen banner
  .then(({ channel, video }) => new Banner({
    type: 'goto:video-profile',
    channelId: channel._id,
    title: Random.ctitle(2, 32),
    value: {
      videoId: video._id
    },
    cover: _.sample(imageList),
    priority: Random.integer(0, 128),
    publishAt: genPublishAt()
  }))

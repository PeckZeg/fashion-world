const globalMixins = require('../../utils/global-mixins');
const debug = require('debug')('import');
const Mock = require('mockjs');
const glob = require('glob');

const Banner = reqlib('./models/Banner');
const Channel = reqlib('./models/VideoChannel');
const Video = reqlib('./models/Video');

const IMAGE_LIST = glob.sync('/data/static/images/video/*.jpg');

module.exports = () => new Promise((resolve, reject) => {
  Channel.aggregate().sample(1).exec()
    .then(channels => {
      if (!channels.length) return reject(new Error('channel not found'));
      resolve(new Channel(channels[0]));
    })
    .catch(reject);
})

  .then(channel => new Promise((resolve, reject) => {
    Video.aggregate().sample(1).exec()
      .then(videos => {
        if (!videos.length) return reject(new Error('video not found'));
        resolve({ channel, video: new Video(videos[0]) });
      })
      .catch(reject);
  }))

  .then(({ channel, video }) => Promise.resolve(new Banner({
    type: 'goto:video-profile',
    channelId: Math.random() > 0.66 ? channel._id : null,
    title: Mock.mock('@ctitle(2, 32)'),
    value: {
      videoId: video._id
    },
    cover: _.sample(IMAGE_LIST),
    priority: Mock.mock('@integer(0, 64)')
  })))

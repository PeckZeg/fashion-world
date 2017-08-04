const debug = require('debug')('data');
const Mock = require('mockjs');

const Banner = reqlib('./models/Banner');
const Channel = reqlib('./models/Channel');

const genPublishAt = require('./genPublishAt');

const { Random } = Mock;
const URL_LIST = [
  'https://www.baidu.com/',
  'http://www.sina.com.cn/',
  'http://www.qq.com/',
  'http://www.163.com/',
  'https://www.wowchina.com/zh-cn/',
  'http://ow.blizzard.cn',
  'http://hs.blizzard.cn',
  'http://heroes.blizzard.cn',
  'http://sc2.blizzard.cn',
  'http://d3.blizzard.cn'
];

module.exports = imageList => Channel.aggregate().sample(1)

  // transform channel
  .then(channels => {
    if (!channels.length) {
      return Promise.reject(new Error('empty channels'));
    }

    return new Channel(channels[0]);
  })

  // gen banner
  .then(channel => new Banner({
    type: 'url',
    channelId: channel._id,
    title: Random.ctitle(2, 32),
    value: _.sample(URL_LIST),
    cover: _.sample(imageList),
    priority: Random.integer(0, 128),
    publishAt: genPublishAt()
  }));

const globalMixins = require('../../utils/global-mixins');
const debug = require('debug')('import');
const Mock = require('mockjs');
const glob = require('glob');

const Banner = reqlib('./models/Banner');
const Channel = reqlib('./models/VideoChannel');

const IMAGE_LIST = glob.sync('/data/static/images/video/*.jpg');

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

// module.exports = () => Promise.resolve(new Banner({
//   type: 'url',
//   title: Mock.mock('@ctitle(2, 16)'),
//   value: _.sample(URL_LIST),
//   cover: _.sample(IMAGE_LIST),
//   priority: Mock.mock('@integer(0, 64)')
// }));


module.exports = () => new Promise((resolve, reject) => {
  Channel.aggregate().sample(1).exec()
    .then(channels => {
      if (!channels.length) return reject(new Error('channel not found'));
      resolve(new Channel(channels[0]));
    })
    .catch(reject);
})

  .then(channel => Promise.resolve(new Banner({
      type: 'url',
      channelId: Math.random() > 0.66 ? channel._id : null,
      title: Mock.mock('@ctitle(2, 32)'),
      value: _.sample(URL_LIST),
      cover: _.sample(IMAGE_LIST),
      priority: Mock.mock('@integer(0, 64)')
  })));

const mapLimit = require('async/mapLimit');
const mongoose = require('mongoose');

const globalMixins = require('../utils/global-mixins');
const VideoChannel = require('../models/VideoChannel');
const VideoChannelCategory = require('../models/VideoChannelCategory');

const { Schema: { ObjectId } } = mongoose;

const CHANNEL_CATEGORIES = [
  {
    channel: 'Fashion TV',
    categories: [
      '人物专题', '时尚趋势', '流行资讯', '时装周', '拍摄花絮',
      '品牌专题', '泳装秀', 'VR', '美女'
    ]
  },
  {
    channel: 'Fashion One',
    categories: [
      '人物专题', '时尚趋势', '流行资讯', '时装周', '拍摄花絮',
      '品牌专题', '泳装秀', 'VR', '美女'
    ]
  }
];

let channelCategories = CHANNEL_CATEGORIES.map(category => new Promise((resolve, reject) => {
  VideoChannel.findOne({ name: category.channel })
    .then(channel => new Promise((resolve, reject) => {
      if (!channel) return reject(new Error('channel not found'));

      resolve(channel);
    }))
    .then(channel => new Promise((resolve, reject) => {
      let categories = category.categories.map((category, idx) => {
        const query = { name: category, channelId: channel._id };
        const doc = {
            $set: {
            name: category,
            channelId: channel._id,
            priority: idx + 1
          }
        };
        const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

        return VideoChannelCategory.findOneAndUpdate(query, doc, opts);
      });

      mapLimit(categories, 5, (saveCategory, cb) => {
        saveCategory.exec().then(category => {
          cb(null, category);
        }).catch(err => cb(err));
      }, (err, categories) => {
        if (err) return reject(err);
        resolve(categories);
      });
    }))
    .then(categories => resolve(categories))
    .catch(reject);
}));

Promise.all(channelCategories).then(categories => {
  console.log(JSON.stringify(categories, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

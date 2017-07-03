const mapLimit = require('async/mapLimit');

const globalMixins = require('../utils/global-mixins');
const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const CHANNELS = require('./channels.json');

const { ObjectId } = require('mongoose').Types;
const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

Promise.resolve(CHANNELS)
  .then(channels => new Promise((resolve, reject) => {
    let channelPromises = channels.map((channel, idx) => {
      const { name, categories } = channel;
      const _id = ObjectId(channel._id);
      const query = { name };
      const doc = { $set: { _id, name, priority: channels.length - idx } };

      return {
        categories,
        saveChannel: VideoChannel.findOneAndUpdate(query, doc, opts)
      };
    });

    mapLimit(channelPromises, 5, ({ categories, saveChannel }, cb) => {
      saveChannel
        .then(channel => cb(null, { channel, categories }))
        .catch(cb);
    }, (err, channels) => {
      if (err) return reject(err);
      resolve(channels);
    });
  }))

  .then(channels => {
    let channelCategories = [];

    channels.forEach(({ channel, categories }) => {
      categories.forEach(category => {
        channelCategories.push({ channel, category });
      });
    });

    return {
      channels: channels.map(({ channel }) => channel),
      categories: channelCategories
    };
  })

  .then(({ channels, categories }) => new Promise((resolve, reject) => {
    let categoryPromises = categories.map(({ channel, category }, idx) => {
      const query = { name: category };
      const doc = { $set: {
        name: category,
        channelId: channel._id,
        priority: categories.length - idx
      } };

      return VideoChannelCategory.findOneAndUpdate(query, doc, opts);
    });

    mapLimit(categoryPromises, 5, (saveCategory, cb) => {
      saveCategory
        .then(category => cb(null, category.toJSON()))
        .catch(cb);
    }, (err, categories) => {
      if (err) return reject(err);
      resolve({ channels, categories });
    });
  }))

  .then(({ channels, categories }) => {
    console.log({ channels, categories });
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

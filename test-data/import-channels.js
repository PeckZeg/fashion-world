const mapLimit = require('async/mapLimit');
const debug = require('debug')('import');

const globalMixins = require('../utils/global-mixins');
const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');
const CHANNELS = require('./channels.json');

const { ObjectId } = require('mongoose').Types;
const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };
const BEGIN_TIMESTAMP = +moment().startOf('year');
const END_TIMESTAMP = +moment().endOf('year');

Promise.resolve(CHANNELS)

  // save channels
  .then(channels => new Promise((resolve, reject) => {
    debug(`即将导入 ${channels.length} 个频道`);

    mapLimit(channels, 1, (channel, cb) => {
      const { name, categories } = channel;
      const _id = ObjectId(channel._id);
      const cond = { name };
      const idx = channels.indexOf(channel);
      const priority = channels.length - idx;
      const publishAt = moment(_.random(BEGIN_TIMESTAMP, END_TIMESTAMP)).toDate();
      const doc = { $set: { _id, name, priority, publishAt } };

      debug(`\t 正在创建第 ${idx + 1} 个频道 ${name}`);
      Channel.findOneAndUpdate(cond, doc, OPTS)
        .then(channel => cb(null, { channel, categories }))
        .catch(cb);
    }, (err, channels) => {
      if (err) return reject(err);
      debug(`导入完毕！共导入 ${channels.length} 个频道`);
      resolve(channels);
    });
  }))

  // transform channels
  .then(channels => {
    const categoryList = [];

    channels.forEach(({ channel, categories }) => {
      const { _id: channelId } = channel;
      categories.forEach(category => {
        categoryList.push({ channelId, category });
      });
    });

    return categoryList;
  })

  // save categories
  .then(categories => new Promise((resolve, reject) => {
    debug(`即将创建 ${categories.length} 个频道分类`);
    mapLimit(categories, 1, (category, cb) => {
      const { channelId, category: name } = category;
      const cond = { channelId, name };
      const idx = categories.indexOf(category);
      const priority = categories.length - idx;
      const publishAt = moment(_.random(BEGIN_TIMESTAMP, END_TIMESTAMP)).toDate();
      const doc = { $set: { channelId, name, priority, publishAt } };

      debug(`\t 正在创建第 ${idx + 1} 个分类：[${channelId}] ${name}`);

      Category.findOneAndUpdate(cond, doc, OPTS)
        .then(category => cb(null, category))
        .catch(cb);
    }, (err, categories) => {
      if (err) return reject(err);
      resolve(categories);
    });
  }))

  // consle
  .then(categories => {
    debug(`导入完毕！共导入 ${categories.length} 个频道分类`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

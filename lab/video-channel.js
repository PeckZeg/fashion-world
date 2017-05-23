const mapLimit = require('async/mapLimit');

const globalMixins = require('../utils/global-mixins');
const VideoChannel = require('../models/VideoChannel');

const CHANNELS = [
  'Fashion TV',
  'Fashion One'
];

Promise.resolve(CHANNELS)
  .then(channels => channels.map((channel, idx) => {
    const query = { name: channel };
    const doc = { $set: { name: channel, priority: idx + 1 } };
    const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

    return VideoChannel.findOneAndUpdate(query, doc, opts);
  }))
  .then(channels => new Promise((resolve, reject) => {
    mapLimit(channels, 5, (saveChannel, cb) => {
      saveChannel.then(channel => cb(null, channel)).catch(err => cb(err));
    }, (err, channels) => {
      if (err) return reject(err);
      resolve(channels);
    });
  }))
  .then(channels => {
    console.log(channels.map(channel => channel.toJSON()));
    process.exit(0);
  })
  .catch(err => console.error(err));

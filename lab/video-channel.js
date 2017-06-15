const mapLimit = require('async/mapLimit');

const globalMixins = require('../utils/global-mixins');
const VideoChannel = require('../models/VideoChannel');

const { ObjectId } = require('mongoose').Types;

const CHANNELS = [
  { _id: ObjectId('5923d5a2afa4194436827736'), name: 'Fashion TV' },
  { _id: ObjectId('5923d5a2afa4194436827737'), name: 'Fashion One' },
];

Promise.resolve(CHANNELS)
  .then(channels => channels.map((channel, idx) => {
    const { _id, name } = channel;
    const query = { name };
    const doc = { $set: { _id, name, priority: idx + 1 } };
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

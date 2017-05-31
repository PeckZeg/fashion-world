const VideoChannel = reqlib('./models/VideoChannel');
const redisClient = reqlib('./redis/client');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./utils/cacheKey')('available-channels')();
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

module.exports = () => redisClient.getAsync(CACHE_KEY)
  .then(channelIds => {
    if (channelIds) {
      return Promise.resolve(JSON.parse(channelIds).map(id => ObjectId(id)));
    }

    return VideoChannel.find(null, '_id')
      .then(channels => _.map(channels, '_id'))
      .then(channelIds => new Promise((resolve, reject) => {
        redisClient.setAsync(CACHE_KEY, JSON.stringify(channelIds), 'EX', CACHE_EXPIRE)
          .then(() => resolve(channelIds))
          .catch(reject);
      }))
  });

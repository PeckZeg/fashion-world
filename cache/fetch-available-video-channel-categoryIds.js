const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const redisClient = reqlib('./redis/client');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./utils/cacheKey')('available-video-channel-categories')();
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

module.exports = () => redisClient.getAsync(CACHE_KEY)
  .then(categoryIds => {
    if (categoryIds) {
      return Promise.resolve(JSON.parse(categoryIds).map(id => ObjectId(id)));
    }

    return VideoChannelCategory.find(null, '_id')
      .then(categories => _.map(categories, '_id'))
      .then(categoryIds => new Promise((resolve, reject) => {
        redisClient.setAsync(CACHE_KEY, JSON.stringify(categoryIds), 'EX', CACHE_EXPIRE)
          .then(() => resolve(categoryIds))
          .catch(reject);
      }));
  });

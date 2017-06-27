const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const createClient = reqlib('./redis/create-client');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./utils/cacheKey')('available-video-channel-categories')();
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

module.exports = () => Promise.resolve(createClient())

  // fetch `categoryIds` from redis
  .then(client => (
    client.smembersAsync(CACHE_KEY).then(categoryIds => ({ client, categoryIds }))
  ))

  // fetch `categoryIds` from mongodb is not in redis
  .then(({ client, categoryIds }) => {
    if (categoryIds.length) {
      return {
        client,
        categoryIds: categoryIds.map(ObjectId)
      };
    }

    const cond = {
      publishAt: { $ne: null },
      removeAt: { $eq: null }
    };

    return VideoChannelCategory.find(cond, '_id')
      .then(categoryIds => _.map(categoryIds, '_id'))
      .then(categoryIds => (
        client
          .multi()
          .sadd(CACHE_KEY, ...categoryIds)
          .expire(CACHE_KEY, CACHE_EXPIRE)
          .execAsync()
          .then(() => ({ client, categoryIds }))
      ))
  })

  // close redis client
  .then(({ client, categoryIds }) => client.quitAsync().then(() => categoryIds));

// module.exports = () => redisClient.getAsync(CACHE_KEY)
//   .then(categoryIds => {
//     if (categoryIds) {
//       return Promise.resolve(JSON.parse(categoryIds).map(id => ObjectId(id)));
//     }
//
//     return VideoChannelCategory.find(null, '_id')
//       .then(categories => _.map(categories, '_id'))
//       .then(categoryIds => new Promise((resolve, reject) => {
//         redisClient.setAsync(CACHE_KEY, JSON.stringify(categoryIds), 'EX', CACHE_EXPIRE)
//           .then(() => resolve(categoryIds))
//           .catch(reject);
//       }));
//   });

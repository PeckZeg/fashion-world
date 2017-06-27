const VideoChannel = reqlib('./models/VideoChannel');
const createClient = reqlib('./redis/create-client');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./utils/cacheKey')('available-channels')();
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

module.exports = () => Promise.resolve(createClient())

  // fetch `channelIds` from cache
  .then(client => (
    client.smembersAsync(CACHE_KEY).then(channelIds => ({ client, channelIds }))
  ))

  // fetch `channelIds` if channelIds not exists
  .then(({ client, channelIds }) => {
    if (channelIds.length) return {
      client,
      channelIds: channelIds.map(id => ObjectId(id))
    };

    const cond = {
      publishAt: { $ne: null },
      removeAt: { $eq: null }
    };

    return VideoChannel.find(cond, '_id')
      .then(channels => _.map(channels, '_id'))
      .then(channelIds => (
        client
          .multi()
          .sadd(CACHE_KEY, ...channelIds)
          .expire(CACHE_KEY, CACHE_EXPIRE)
          .execAsync()
          .then(() => ({ client, channelIds }))
      ))
  })

  // close reids client
  .then(({ client, channelIds }) => client.quitAsync().then(() => channelIds));

const Channel = reqlib('./models/Channel');
const createClient = reqlib('./redis/create-client');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./redis/keys')('cache:available:channels')();
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

module.exports = () => Promise.resolve(createClient())

  // fetch from cache
  .then(client => (
    client.smembersAsync(CACHE_KEY).then(channelIds => ({ client, channelIds }))
  ))

  // check cache exists
  .then(({ client, channelIds }) => {
    if (channelIds && channelIds.length) {
      return {
        client,
        channelIds: channelIds.map(id => ObjectId(id))
      };
    }

    const cond = {
      publishAt: { $lte: new Date() },
      removeAt: { $eq: null }
    };

    return Channel.find(cond, '_id')

      // map objectid
      .then(channels => _.map(channels, '_id'))

      // create redis multi command
      .then(channelIds => ({ channelIds, multi: client.multi() }))

      // sadd cache
      .then(args => {
        const { channelIds, multi } = args;

        channelIds.forEach(channelId => {
          multi.sadd(CACHE_KEY, channelId.toString());
        });

        multi.expire(CACHE_KEY, CACHE_EXPIRE);

        return args;
      })

      // exec multi command
      .then(({ channelIds, multi }) => (
        multi.execAsync().then(() => ({ client, channelIds }))
      ));
  })

  // close redis client
  .then(({ client, channelIds }) => client.quitAsync().then(() => channelIds));

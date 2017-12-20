const map = require('lodash/map');

const createClient = require('redis/createClient');

const Channel = require('models/Channel');

const CACHE_KEY = require('redis/keys/cache/publishedChannels');
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

const { ObjectId } = require('mongoose').Types;

module.exports = async () => {
  const client = createClient();

  let ids = await client.smembersAsync(CACHE_KEY);

  if (ids && ids.length) {
    ids = map(ids, id => ObjectId(id));
  }

  else {
    const cond = {
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };
    ids = map(await Channel.find(cond), '_id');
    const multi = client.multi();

    for (const id of ids) {
      multi.sadd(CACHE_KEY, id.toString());
    }

    multi.expire(CACHE_KEY, CACHE_EXPIRE);
    await multi.execAsync();
  }

  await client.quitAsync();

  return ids;
};

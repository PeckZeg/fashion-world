const map = require('lodash/map');

const fetchPublishedChannels = require('./publishedChannels');
const createClient = require('redis/createClient');

const Category = require('models/Category');

const CACHE_KEY = require('redis/keys/cache/publishedCategories');
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
      channelId: await fetchPublishedChannels(),
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };
    console.log(cond);
    ids = map(await Category.find(cond), '_id');
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

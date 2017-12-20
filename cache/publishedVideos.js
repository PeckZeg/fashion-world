const assign = require('lodash/assign');
const map = require('lodash/map');

const fetchPublishedCategories = require('./publishedCategories');
const fetchPublishedChannels = require('./publishedChannels');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const CACHE_KEY = require('redis/keys/cache/publishedVideos');
const CACHE_EXPIRE = moment.duration(5, 'm').asSeconds();

const { ObjectId } = require('mongoose').Types;

/**
 *  获取已发布的视频编号
 *  @returns {Promise}
 */
module.exports = async (opts = {}) => {
  opts = assign({ string: false }, opts);

  const client = createClient();

  let ids = await client.smembersAsync(CACHE_KEY);

  if (ids && ids.length) {
    ids = map(ids, id => ObjectId(id));
  }

  else {
    const cond = {
      channelId: {
        $in: await fetchPublishedChannels()
      },
      categoryId: {
        $in: await fetchPublishedCategories()
      },
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };
    ids = map(await Video.find(cond), '_id');
    const multi = client.multi();

    for (const id of ids) {
      multi.sadd(CACHE_KEY, id.toString());
    }

    multi.expire(CACHE_KEY, CACHE_EXPIRE);
    await multi.execAsync();
  }

  if (opts.string) {
    ids = map(ids, id => id.toString());
  }

  await client.quitAsync();

  return ids;
};

const debug = require('debug')('migrate');

const map = require('lodash/map');

const cacheKey = require('scripts/migrateVideo/keys/videoList');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const searchId = process.env.NODE_ENV == 'test' ?
    '598e0b2c97c46c20f17aa234' : '598828920451c8c6f62fd45e';

/**
 *  初始化同步列表
 */
module.exports = async () => {
  const client = createClient();

  if (!await client.scardAsync(cacheKey)) {
    let idList = await Video.find(null, '_id');
        idList = map(idList, ({ _id }) => _id.toString());
        idList = idList.filter(id => id == searchId);

    await client.saddAsync(cacheKey, ...idList);
  }

  await client.quitAsync();
};

const map = require('lodash/map');

const createClient = require('redis/createClient');
const cacheKey = require('./keys/videoIdList');

const Video = require('models/Video');

module.exports = async () => {
  const client = createClient();
  const key = cacheKey();
  let idList = await client.smembersAsync(key);

  if (!idList.length) {
    idList = map(await Video.find(null, '_id'), ({ _id }) => _id.toString());

    await client.saddAsync(key, ...idList);
  }

  await client.quitAsync();

  return idList;
};

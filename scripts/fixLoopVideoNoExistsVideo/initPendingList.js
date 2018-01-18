const debug = require('debug')('fix');

const includes = require('lodash/includes');
const without = require('lodash/without');
const map = require('lodash/map');

const createClient = require('redis/createClient');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

module.exports = async function() {
  const client = createClient();
  let videoIds = map(
    await LoopVideo.find({}, 'videoId'),
    ({ videoId }) => videoId.toString()
  );

  let existVideoIds = map(
    await Video.find({ _id: { $in: videoIds } }, ''),
    ({ _id }) => _id.toString()
  );

  videoIds = without(videoIds, ...existVideoIds);

  let ids = map(
    await LoopVideo.find({ videoId: { $in: videoIds } }),
    ({ _id }) => _id.toString()
  );

  ids = without(ids, ...(await client.smembersAsync(COMPLETE_LIST)));

  for (const id of await client.smembersAsync(ERROR_LIST)) {
    if (!includes(ids, id)) {
      ids.push(id);
    }
  }

  if (ids.length) {
    await client.saddAsync(PENDING_LIST, ...ids);
  }

  const total =  await client.scardAsync(PENDING_LIST);

  await client.delAsync(ERROR_LIST);
  await client.quitAsync();

  return total;
};

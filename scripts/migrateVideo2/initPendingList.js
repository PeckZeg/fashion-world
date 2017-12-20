const debug = require('debug')('migrate');

const includes = require('lodash/includes');
const without = require('lodash/without');
const map = require('lodash/map');

const createClient = require('redis/createClient');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

const FILENAMES = process.env.NODE_ENV === 'development' ? [
  /巴黎时装周秋冬M17-18-Lucienpellat-finet后台\.mp4/,
  // /短片2017-FashionShow-TheBattleoflifebyTelaviver\.mp4/
] : [];

module.exports = async () => {
  const client = createClient();

  const sources = await SourceVideo.find({
    ...FILENAMES ? { filename: { $in: FILENAMES }  } : null
  });
  const sourceId = map(sources, '_id');
  let ids = map(await Video.find(
    sourceId.length ? { sourceId: { $in: sourceId } } : null
  ), ({ _id }) => _id.toString());

  for (const videoId of await client.smembersAsync(COMPLETE_LIST)) {
    ids = without(ids, videoId);
  }

  for (const id of await client.smembersAsync(ERROR_LIST)) {
    if (!includes(ids, id)) {
      ids.push(id);
    }
  }

  await client.saddAsync(PENDING_LIST, ...ids);

  await client.delAsync(ERROR_LIST);

  await client.quitAsync();
};

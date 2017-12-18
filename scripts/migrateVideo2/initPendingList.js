const debug = require('debug')('migrate');

const map = require('lodash/map');

const createClient = require('redis/createClient');

const SourceVideo = require('models/SourceVideo');
const Video = require('models/Video');

const { PENDING_LIST } = require('./keys');

const FILENAMES = process.env.NODE_ENV !== 'production' ? [
  /巴黎时装周秋冬M17-18-Lucienpellat-finet后台\.mp4/,
  // /短片2017-FashionShow-TheBattleoflifebyTelaviver\.mp4/
] : [];

module.exports = async () => {
  const client = createClient();

  if (!await client.scardAsync(PENDING_LIST)) {
    const sources = await SourceVideo.find({ filename: { $in: FILENAMES } });
    const sourceId = map(sources, '_id');
    const cond = sourceId.length ? { sourceId: { $in: sourceId } } : null;
    let ids = map(await Video.find(
      sourceId.length ? { sourceId: { $in: sourceId } } : null
    ), ({ _id }) => _id.toString());

    await client.saddAsync(PENDING_LIST, ...ids);
  }

  await client.quitAsync();
};

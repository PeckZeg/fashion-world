const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./utils/cacheKey')('video:collected-users');

module.exports = videos => Promise.resolve(videos)

  // map video id list
  .then(videos => ({ videos, videoIds: mapObjectIds(videos, '_id') }))

  // create redis client
  .then(args => {
    const client = createClient();
    const multi = client.multi();

    return { ...args, client, multi };
  })

  // count video collected users
  .then(args => {
    const { videoIds, multi } = args;

    videoIds.forEach(videoId => multi.hlen(cacheKey(videoId)));

    return args;
  })

  // exec redis multi command
  .then(({ videos, videoIds, client, multi }) => (
    multi.execAsync().then(collections => ({
      videos, client,
      collections: _.zipObject(videoIds, collections)
    }))
  ))

  // close redis client
  .then(({ videos, client, collections }) => (
    client.quitAsync().then(() => ({ videos, collections }))
  ))

  // inject collections
  .then(({ videos, collections }) => videos.map(video => ({
    ...video,
    collections: collections[video._id]
  })));

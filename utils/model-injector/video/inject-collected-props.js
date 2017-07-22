const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./redis/keys')('client:video:collected-users');

module.exports = (token, videos, handlerName = 'toJSON') => {
  if (!token || !token.userId) {
    return Promise.resolve(videos);
  }

  const userId = token.userId.toString();

  return Promise.resolve(videos)

    // generate video id list
    .then(videos => ({
      videos,
      videoIds: mapObjectIds(videos, '_id')
    }))

    // create redis client & multi
    .then(args => {
      const client = createClient();
      const multi = client.multi();

      return { ...args, client, multi };
    })

    // get `isCollected` props from cache
    .then(args => {
      const { videoIds, multi } = args;

      videoIds.forEach(videoId => {
        multi.hexists(cacheKey(videoId), userId);
      });

      return args;
    })

    // exec redis multi command
    .then(({ videos, videoIds, client, multi }) => (
      multi.execAsync().then(collections => ({
        videos,
        collections: _.zipObject(videoIds, collections),
        client
      }))
    ))

    // close redis client
    .then(({ videos, collections, client }) => (
      client.quitAsync().then(() => ({ videos, collections }))
    ))

    // inject `isCollected` props
    .then(({ videos, collections }) => videos.map(video => ({
      ...video,
      isCollected: Boolean(collections[video._id])
    })));
};

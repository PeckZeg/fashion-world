const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./redis/keys')('client:video:favourite-users');

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

    // get `isFavoured` props from cache
    .then(args => {
      const { videoIds, multi } = args;

      videoIds.forEach(videoId => {
        multi.hexists(cacheKey(videoId), userId);
      });

      return args;
    })

    // exec redis multi command
    .then(({ videos, videoIds, client, multi }) => (
      multi.execAsync().then(favourites => ({
        videos,
        favourites: _.zipObject(videoIds, favourites),
        client
      }))
    ))

    // close redis client
    .then(({ client, videos, favourites }) => (
      client.quitAsync().then(() => ({ videos, favourites }))
    ))

    // inject `isFavoured` props
    .then(({ videos, favourites }) => videos.map(video => ({
      ...video,
      isFavoured: Boolean(favourites[video._id])
    })));
};

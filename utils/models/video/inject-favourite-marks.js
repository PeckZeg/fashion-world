const mapObjectIds = reqlib('./utils/map-objectids');
const createRedisClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./utils/cacheKey');

const createVideoFavouriteUsersCacheKey = cacheKey('video:favourite-users');

module.exports = (videos, userId) => {
  videos = Array.isArray(videos) ? videos : [videos];

  if (!userId) return Promise.resolve(videos);

  return Promise.resolve(videos)

    // map video id list
    .then(videos => ({ videos, videoIds: mapObjectIds(videos, '_id') }))

    // create redis client & multi
    .then(args => {
      const client = createRedisClient();
      const multi = client.multi();

      return { client, multi, ...args };
    })

    // check favourite mark
    .then(args => {
      const { videoIds, multi } = args;

      videoIds.forEach(videoId => {
        multi.sismember(
          createVideoFavouriteUsersCacheKey(videoId),
          userId
        );
      });

      return args;
    })

    // exec redis multi command
    .then(({ videos, videoIds, client, multi }) => (
      multi.execAsync().then(favourites => ({
        client,
        videos,
        favourites: _.zipObject(videoIds, favourites)
      }))
    ))

    // close redis client
    .then(({ client, videos, favourites }) => (
      client.quitAsync().then(() => ({ videos, favourites })
    )))

    // inject `isFavoured`
    .then(({ videos, favourites }) => videos.map(video => ({
      ...video,
      isFavoured: !!favourites[video._id]
    })));
};

const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./utils/cacheKey')('video:collected-users');

module.exports = (videos, userId) => {
  videos = Array.isArray(videos) ? videos : [videos];

  if (!userId) {
    return Promise.resolve(videos);
  }

  return Promise.resolve(videos)

    // map video id list
    .then(videos => ({ videos, videoIds: mapObjectIds(videos, '_id') }))

    // create redis client & multi
    .then(args => {
      const client = createClient();
      const multi = client.multi();

      return { ...args, client, multi };
    })

    // check user is collected video
    .then(args => {
      const { videoIds, multi } = args;

      videoIds.forEach(videoId => multi.hexists(
        cacheKey(videoId),
        userId.toString()
      ));

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

    // inject `isCollected`
    .then(({ videos, collections }) => videos.map(video => ({
      ...video,
      isCollected: !!collections[video._id]
    })));
};

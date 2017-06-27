const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./utils/cacheKey')('video:favourite-users');

module.exports = videos => Promise.resolve(videos)

  // map video id list
  .then(videos => ({ videos, videoIds: mapObjectIds(videos, '_id') }))

  // create redis client
  .then(args => {
    const client = createClient();
    const multi = client.multi();

    return { client, multi, ...args };
  })

  // count video favourites
  .then(args => {
    const { videoIds, multi } = args;

    videoIds.forEach(videoId => multi.scard(cacheKey(videoId)));

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
    client.quitAsync().then(() => ({ videos, favourites }))
  ))

  // inject favourites
  .then(({ videos, favourites }) => videos.map(video => ({
    ...video,
    favourites: favourites[video._id]
  })));

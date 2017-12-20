const Video = reqlib('./models/Video');

const createClient = reqlib('./redis/create-client');

const { Types: { ObjectId } } = require('mongoose');
const CACHE_KEY = reqlib('./redis/keys')('cache:available:videos')();
const CACHE_EXPIRE = moment.duration(3, 'm').asSeconds();

module.exports = () => Promise.resolve(createClient())

  // fetch from cache
  .then(client => (
    client.smembersAsync(CACHE_KEY).then(videoIds => ({ client, videoIds }))
  ))

  // ensure cache exists
  .then(({ client, videoIds }) => {
    if (videoIds && videoIds.length) {
      return {
        client,
        videoIds: videoIds.map(id => ObjectId(id))
      };
    }

    const cond = {
      publishAt: { $ne: null, $lte: new Date() },
      removeAt: null
    };

    return Video.find(cond, '_id')

      // map `videoId`
      .then(videos => _.map(videos, '_id'))

      // create redis multi command
      .then(videoIds => ({ videoIds, multi: client.multi() }))

      // sadd cache
      .then(args => {
        const { videoIds, multi } = args;

        videoIds.forEach(videoId => {
          multi.sadd(CACHE_KEY, videoId.toString());
        });

        multi.expire(CACHE_KEY, CACHE_EXPIRE);

        return args;
      })

      // exec multi command
      .then(({ videoIds, multi }) => (
        multi.execAsync().then(() => ({ client, videoIds }))
      ));
  })

  // quit redis client
  .then(({ client, videoIds }) => client.quitAsync().then(() => videoIds));

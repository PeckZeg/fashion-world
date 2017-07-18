const globalMixins = require('../../utils/global-mixins');
const createRedisClient = reqlib('./redis/create-client');

const { CACHE_KEY, SYNC_FLAG_CACHE_KEY } = require('./config');

module.exports = videos => Promise.resolve(videos)

  .then(videos => {
    const client = createRedisClient();
    const multi = client.multi();

    return { videos, client, multi };
  })

  .then(args => {
    const { videos, client, multi } = args;

    videos.forEach(video => {
      multi.hsetnx(CACHE_KEY, video.id, JSON.stringify(video));
    });

    return args;
  })

  .then(({ videos, client, multi }) => (
    multi.execAsync().then(() => ({ videos, client }))
  ))

  .then(({ videos, client }) => (
    client.quitAsync().then(() => _.map(videos, 'id'))
  ))

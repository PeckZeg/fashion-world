const globalMixins = require('../../utils/global-mixins');
const createRedisClient = reqlib('./redis/create-client');

const readSyncList = require('./load-sync-list');
const cacheToRedis = require('./cache-to-redis');

const CSV_FILE = './csv/20170717.csv';
const { SYNC_FLAG_CACHE_KEY } = require('./config');

Promise.resolve(createRedisClient())

  .then(client => (
    client.existsAsync(SYNC_FLAG_CACHE_KEY).then(exists => ({ exists, client }))
  ))

  .then(({ exists, client }) => {
    if (exists) return client;

    return client.setAsync(SYNC_FLAG_CACHE_KEY, 'true')
      .then(() => readSyncList(CSV_FILE))
      .then(videoIds => client.delAsync(SYNC_FLAG_CACHE_KEY))
      .then(() => client)
  })

  .then(client => client.quitAsync())

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);

    const client = createRedisClient();

    client.delAsync(SYNC_FLAG_CACHE_KEY)
      .then(() => client.quitAsync())
      .then(() => process.exit(1))
      .catch(err => process.exit(1));
  });

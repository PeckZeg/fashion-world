const globalMixins = require('../utils/global-mixins');

const createClient = reqlib('./redis/create-client');

const client = createClient();

client
  .multi()
  .del('sets')
  // .sadd('sets', 'hello')
  // .sadd('sets', 'world')
  // .sismember('sets', 'test')
  .smembers('sets')
  .execAsync()
  .then(results => {
    console.log(results);
    return client.quitAsync();
  })
  .then(result => {
    console.log({result});
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })

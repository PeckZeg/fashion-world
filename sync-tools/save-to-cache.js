const createClient = reqlib('./redis/create-client');

const { ftv: CACHE_KEY } = require('./config').keys;

module.exports = files => Promise.resolve(files)

  // create redis client & multi
  .then(files => {
    const client = createClient();
    const multi = client.multi();

    return { files, client, multi };
  })

  // iter each files
  .then(({ files, client, multi }) => {
    files.forEach(file => {
      multi.hsetnx(CACHE_KEY, file.name, JSON.stringify(file));
    });

    return { files, client, multi };
  })

  // exec multi command
  .then(({ files, client, multi }) => (
    multi.execAsync().then(() => ({ files, client }))
  ))

  // quit client
  .then(({ files, client }) => (
    client.quitAsync().then(() => files)
  ));

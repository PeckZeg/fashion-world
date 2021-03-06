const debug = require('debug')('migrate');

const includes = require('lodash/includes');
const without = require('lodash/without');
const map = require('lodash/map');

const createClient = require('redis/createClient');

const LoopVideo = require('models/LoopVideo');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

module.exports = async () => {
  const client = createClient();

  let ids = map(
    await LoopVideo.find({ cover: /^\/static/ }),
    ({ _id }) => _id.toString()
  );


  for (const id of await client.smembersAsync(COMPLETE_LIST)) {
    ids = without(ids, id);
  }

  for (const id of await client.smembersAsync(ERROR_LIST)) {
    if (!includes(ids, id)) {
      ids.push(id);
    }
  }

  if (ids.length) {
    await client.saddAsync(PENDING_LIST, ...ids);
  }

  const total =  await client.scardAsync(PENDING_LIST);

  await client.delAsync(ERROR_LIST);
  await client.quitAsync();

  return total;
};

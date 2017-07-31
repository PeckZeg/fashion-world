const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./redis/keys')('client:user:collected-videos');

module.exports = users => Promise.resolve(users)

  // map user id list
  .then(users => ({ users, userIds: mapObjectIds(users, '_id') }))

  // create redis client
  .then(args => {
    const client = createClient();
    const multi = client.multi();

    return { ...args, client, multi };
  })

  // count each user favourite videos
  .then(args => {
    const { userIds, multi } = args;

    userIds.forEach(userId => multi.hlen(cacheKey(userId)));

    return args;
  })

  // exec redis multi command
  .then(({ users, userIds, client, multi }) => (
    multi.execAsync().then(collections => ({
      users,
      collections: _.zipObject(userIds, collections),
      client
    }))
  ))

  // close redis client
  .then(({ users, collections, client }) => (
    client.quitAsync().then(() => ({ users, collections }))
  ))

  // inject collections
  .then(({ users, collections }) => users.map(user => ({
    ...user,
    collections: collections[user._id]
  })));

const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./redis/keys')('client:user:favourite-videos');

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
    multi.execAsync().then(favourites => ({
      users,
      favourites: _.zipObject(userIds, favourites),
      client
    }))
  ))

  // close redis client
  .then(({ users, favourites, client }) => (
    client.quitAsync().then(() => ({ users, favourites }))
  ))

  // inject favourites
  .then(({ users, favourites }) => users.map(user => ({
    ...user,
    favourites: favourites[user._id]
  })));

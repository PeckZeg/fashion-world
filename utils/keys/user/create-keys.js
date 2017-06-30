const createApiKey = reqlib('./utils/keys/api-key');
const createSecretKey = reqlib('./utils/keys/secret-key');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./redis/keys')('client:user:login');

const EXPIRE  = moment.duration(3, 'days');

module.exports = user => Promise.resolve(user)

  //  create redis client & cache key
  .then(user => ({ user, key: cacheKey(user._id), client: createClient() }))

  // fetch keys from cache
  .then(({ user, key, client }) => (
    client.getAsync(key).then(keys => ({ user, key, client, keys }))
  ))

  // transform keys
  .then(({ user, key, client, keys }) => {
    if (keys) {
      keys = { ...JSON.parse(keys), user };

      return { keys, client };
    }

    const apiKey = createApiKey(user);
    const secretKey = createSecretKey(apiKey);
    const keyByApiKey = cacheKey(apiKey);
    const userId = user._id;
    const expireIn = +moment().add(+EXPIRE, 'ms');

    keys = { apiKey, secretKey, userId, expireIn };

    const keysJSON = JSON.stringify(keys);
    const expire = EXPIRE.asSeconds();

    return client.multi()
      .set(key, keysJSON).expire(key, expire)
      .set(keyByApiKey, keysJSON).expire(keyByApiKey, expire)
      .execAsync()
      .then(() => ({ keys: { ...keys, user }, client }))
  })

  // close redis client
  .then(({ keys, client }) => (
    client.quitAsync().then(() => keys)
  ));

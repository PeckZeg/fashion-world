const createApiKey = reqlib('./utils/keys/api-key');
const createSecretKey = reqlib('./utils/keys/secret-key');
const createClient = reqlib('./redis/create-client');
const cacheKey = reqlib('./redis/keys')('admin:account:key');

const EXPIRE  = moment.duration(3, 'days');

module.exports = account => Promise.resolve(account)

  // create redis client & cache key
  .then(account => ({
    account,
    key: cacheKey(account._id),
    client: createClient()
  }))

  // fetch keys from cache
  .then(({ account, key, client }) => (
    client.getAsync(key).then(keys => ({ account, key, client, keys }))
  ))

  // transform keys
  .then(({ account, key, client, keys }) => {
    if (keys) {
      keys = { ...JSON.parse(keys), account };

      return { keys, client };
    }

    const apiKey = createApiKey(account);
    const secretKey = createSecretKey(apiKey);
    const keyByApiKey = cacheKey(apiKey);
    const { _id: accountId } = account;
    const expireIn = +moment().add(+EXPIRE, 'ms');

    keys = { apiKey, secretKey, accountId, expireIn };

    const keysJSON = JSON.stringify(keys);
    const expire = EXPIRE.asSeconds();

    return client.multi()
      .set(key, keysJSON).expire(key, expire)
      .set(keyByApiKey, keysJSON).expire(keyByApiKey, expire)
      .execAsync()
      .then(() => ({ keys: { ...keys, account }, client }));
  })

  // quit redis client
  .then(({ keys, client }) => (
    client.quitAsync().then(() => keys)
  ))

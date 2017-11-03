const createClient = reqlib('./redis/createClient');
const cacheKey = reqlib('./redis/keys/client/user');
const genSecretKey = require('../genSecretKey');
const genApiKey = require('../genApiKey');

const { user: EXPIRE } = config.cache.expire;

module.exports = async user => {
  const client = createClient();
  const key = cacheKey(user._id);
  let keys = await client.getAsync(key);

  if (keys) {
    keys = JSON.parse(keys);
  }

  else {
    const apiKey = genApiKey(user);
    const secretKey = genSecretKey(apiKey);
    const keyByApiKey = cacheKey(apiKey);
    const { _id: userId } = user;
    const expireIn = +moment().add(+EXPIRE, 'ms');

    keys = { apiKey, secretKey, userId, expireIn };

    const keysJSON = JSON.stringify(keys);
    const expire = EXPIRE.asSeconds();

    await client.multi()
      .set(key, keysJSON).expire(key, expire)
      .set(keyByApiKey, keysJSON).expire(keyByApiKey, expire)
      .execAsync();
  }

  await client.quitAsync();

  return { ...keys, user };
};

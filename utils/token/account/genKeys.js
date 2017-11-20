const cacheKey = require('redis/keys/admin/account');
const createClient = require('redis/createClient');
const genSecretKey = require('../genSecretKey');
const genApiKey = require('../genApiKey');

const { account: EXPIRE } = config.cache.expire;

module.exports = async account => {
  const client = createClient();
  const key = cacheKey(account._id);
  let token = await client.getAsync(key);

  if (token) {
    token = JSON.parse(token);
  }

  else {
    const apiKey = genApiKey(account);
    const secretKey = genSecretKey(apiKey);
    const keyByApiKey = cacheKey(apiKey);
    const { _id: accountId } = account;
    const expireIn = +moment().add(+EXPIRE, 'ms');

    token = { apiKey, secretKey, accountId, expireIn };

    const tokenJSON = JSON.stringify(token);
    const expire = EXPIRE.asSeconds();

    await client.multi()
      .set(key, tokenJSON).expire(key, expire)
      .set(keyByApiKey, tokenJSON).expire(key, expire)
      .execAsync();
  }

  await client.quitAsync();

  return { ...token, account };
};

const handleError = reqlib('./utils/response/handle-error');
const cacheKey = reqlib('./redis/keys')('admin:account:key');
const authToken = reqlib('./utils/keys/account/auth-token');
const createClient = reqlib('./redis/create-client');

const ACTION = config.apiActions['admin:account:delete:logout'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // create redis client & multi
    .then(keys => {
      const client = createClient();
      const multi = client.multi();

      return { ...keys, client, multi };
    })

    // remove keys from cache
    .then(args => {
      const { apiKey, accountId, multi } = args;

      multi.del(cacheKey(apiKey)).del(cacheKey(accountId));

      return args;
    })

    // exec redis multi command
    .then(({ client, multi }) => (
      multi.execAsync().then(() => client)
    ))

    // quit redis client
    .then(client => client.quitAsync().then(() => 'ok'))

    .then(message => res.send({ message }))
    .catch(err => handleError(res, err));
};

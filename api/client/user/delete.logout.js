const handleError = reqlib('./utils/response/handle-error');
const cacheKey = reqlib('./redis/keys')('client:user:key');
const authToken = reqlib('./utils/keys/user/auth-token');
const createClient = reqlib('./redis/create-client');

const User = reqlib('./models/User');

const ACTION = config.apiActions['user.delete.logout'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'), true)

    // create redis client & multi
    .then(keys => {
      const client = createClient();
      const multi = client.multi();

      return { ...keys, client, multi  };
    })

    // remove keys from cache
    .then(args => {
      const { apiKey, userId, multi } = args;

      multi.del(cacheKey(apiKey)).del(cacheKey(userId));

      return args;
    })

    // exec redis multi command
    .then(({ client, multi }) => (
      multi.execAsync().then(() => client)
    ))

    // close redis client
    .then(client => client.quitAsync().then(() => 'ok'))

    .then(message => res.send({ message }))
    .catch(err => handleError(res, err));
};

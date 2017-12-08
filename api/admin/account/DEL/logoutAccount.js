const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const cacheKey = reqlib('./redis/keys')('admin:account:key');
const authToken = reqlib('./utils/token/auth/account');
const createClient = reqlib('./redis/create-client');
const createLog = reqlib('./utils/createAccountLog');

const ACTION = 'ADMIN_ACCOUNT_DEL_LOGOUT_ACCOUNT';


module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // create redis client & multi
    .then(token => {
      const client = createClient();
      const multi = client.multi();

      return { ...token, client, multi };
    })

    // remove token from cache
    .then(args => {
      const { apiKey, accountId, multi } = args;
      multi.del(cacheKey(apiKey)).del(cacheKey(accountId));
      return args;
    })

    // exec redis multi
    .then(({ client, multi }) => (
      multi.execAsync().then(() => client)
    ))

    // quit redis client
    .then(client => client.quitAsync().then(() => 'ok'))

    .then(message => handleResult(res, { message }, log))
    .catch(err => handleError(res, err));
};
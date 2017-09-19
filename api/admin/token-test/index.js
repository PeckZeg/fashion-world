const cacheKey = reqlib('./redis/keys')('admin:account:key');
const handleError = reqlib('./utils/response/handle-error');
const createLog = reqlib('./utils/createAccountLog');
const authToken = reqlib('./utils/token/auth');

const router = module.exports = require('express').Router();
const ACTION = 'ADMIN_ACCOUNT_POST_LOGIN_ACCOUNT';

router.get('/', (req, res) => {
  const log = createLog(req, ACTION)

  authToken(req, ACTION, { cacheKey, log, logIdProp: 'accountId' })

    .then(result => res.send({log}))
    .catch(err => handleError(res, err));
});

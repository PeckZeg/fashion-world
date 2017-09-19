const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const createLog = reqlib('./utils/createAccountLog');
const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_ACCOUNT_GET_FETCH_ACCOUNT_LIST';

module.exports = (req, res) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // transform query
    .then(token => transformQuery(req.query))

    // validate query
    .then(validateQuery)

    // gen query
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = mergeQueryCond(cond, query);
      sort = setSort(sort, query);

      return { cond, skip, limit, sort };
    })

    // query account docs
    .then(({ cond, skip, limit, sort }) => (
      Account.find(cond).skip(skip).limit(limit).sort(sort)
        .then(accounts => accounts.map(account => account.toObject()))
        .then(accounts => ({ cond, accounts }))
    ))

    // count accounts
    .then(({ cond, accounts }) => (
      Account.count(cond).then(total => ({ total, accounts }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};

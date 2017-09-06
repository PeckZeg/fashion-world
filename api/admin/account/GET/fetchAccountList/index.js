const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const setSort = reqlib('./utils/api-model/sort');
const setSearchCond = reqlib('./utils/api-model/search-cond');
const setTransProps = reqlib('./utils/api-model/setTransProps');
const createLog = reqlib('./utils/createAccountLog');

const Account = reqlib('./models/Account');

const ACTION = 'ADMIN_ACCOUNT_GET_FETCH_ACCOUNT_LIST';
const { SEARCH_PROPS, SORT_PROPS, COND_PROPS } = require('./config');

module.exports = (req, res) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

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

      cond = setTransProps(cond, query, COND_PROPS);
      cond = setSearchCond(query, cond, SEARCH_PROPS);

      sort = setSort(query, sort, SORT_PROPS);

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

    .then(result => handleResult(res, result, log, reqAt))
    .catch(err => handleError(res, err));
};

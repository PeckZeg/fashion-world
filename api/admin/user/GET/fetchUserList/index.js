const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const createLog = reqlib('./utils/createAccountLog');
const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));

const User = reqlib('./models/User');

const ACTION = 'ADMIN_USER_GET_FETCH_USER_LIST';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);
  const reqAt = +new Date();

  authToken(config.apiActions[ACTION], req.header('authorization'))

    // add `accountId` to log
    .then(token => log.setAccountId(token))

    // transform query
    .then(token => transformQuery(req.query))

    // validate query
    .then(validateQuery)

    // gen query cond
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = mergeQueryCond(cond, query);
      sort = setSort(sort, query);

      return { cond, skip, limit, sort };
    })

    // query user docs
    .then(({ cond, skip, limit, sort }) => (
      User.find(cond).skip(skip).limit(limit).sort(sort)
        .then(users => users.map(user => user.toObject()))
        .then(users => ({ cond, users }))
    ))

    // count users
    .then(({ cond, users }) => (
      User.count(cond).then(total => ({ total, users }))
    ))

    .then(result => handleResult(res, result, log, reqAt))
    .catch(err => handleError(res, err));
};

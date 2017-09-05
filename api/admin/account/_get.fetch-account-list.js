const validateParams = reqlib('./validate-models/admin/account/fetch-account-list-query-params');
const setSearchCond = reqlib('./utils/api-model/search-cond');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = reqlib('./utils/transform-query');
const setSort = reqlib('./utils/api-model/sort');

const Account = reqlib('./models/Account');

const ACTION = config.apiActions['admin:account:get:fetch-account-list'];
const TRANSFORM_QUERY_PARAMS = { isActive: Boolean, isRemoved: Boolean };
const QUERY_TO_COND_PARAMS = { isActive: 'activeAt', isRemoved: 'removeAt' };
const SORT_PROPS = ['activeAt', 'removeAt'];
const SEARCH_PROPS = ['name'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // transform query params
    .then(() => transformQuery(req.query, TRANSFORM_QUERY_PARAMS))

    // validate query params
    .then(validateParams)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      _.forEach(QUERY_TO_COND_PARAMS, (transKey, key) => {
        if (query[key] !== void 0) {
          Object.assign(cond, {
            [transKey]: query[key] ? { $ne: null } : null
          });
        }
      });

      sort = setSort(query, sort, SORT_PROPS);
      cond = setSearchCond(query, cond, SEARCH_PROPS);

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

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

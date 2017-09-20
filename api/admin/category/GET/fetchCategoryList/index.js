const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/category');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');

const Category = reqlib('./models/Category');

const ACTION = 'ADMIN_CATEGORY_GET_FETCH_CATEGORY_LIST';
const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // transform query
    .then(token => transformQuery(req.query))

    // validate query
    .then(validateQuery)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = mergeQueryCond(cond, query);
      sort = setSort(sort, query);

      return { cond, skip, limit, sort };
    })

    // query category docs
    .then(({ cond, skip, limit, sort }) => (
      Category.find(cond).skip(skip).limit(limit).sort(sort)
        .then(categories => injectProps(categories, 'toObject'))
        .then(categories => ({ cond, categories }))
    ))

    // count category docs
    .then(({ cond, categories }) => (
      Category.count(cond).then(total => ({ total, categories }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/banner');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));

const Banner = reqlib('./models/Banner');

const action = 'ADMIN_BANNER_GET_FETCH_BANNER_LIST';

module.exports = (req, res, next) => {
  const log = createLog(req, action);

  authToken(req, action, { log })

    // transform query params
    .then(token => transformQuery(req.query))

    // validate query params
    .then(validateQuery)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const { type, channelId, categoryId } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = mergeQueryCond(cond, query);
      sort = setSort(sort, query);

      return { cond, skip, limit, sort };
    })

    // query banner docs
    .then(({ cond, skip, limit, sort }) => (
      Banner.find(cond).skip(skip).limit(limit).sort(sort)
        .then(banners => injectProps(banners, 'toObject'))
        .then(banners => ({ cond, banners }))
    ))

    // count banner docs
    .then(({ cond, banners }) => (
      Banner.count(cond).then(total => ({ total, banners }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};

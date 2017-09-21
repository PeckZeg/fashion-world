const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');

const Channel = reqlib('./models/Channel');

const ACTION = 'ADMIN_CHANNEL_GET_FETCH_CHANNEL_LIST';

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

    // query channel docs
    .then(({ cond, skip, limit, sort }) => (
      Channel.find(cond).skip(skip).limit(limit).sort(sort)
        .then(channels => channels.map(channel => channel.toObject()))
        .then(channels => ({ cond, channels }))
    ))

    // count channel docs
    .then(({ cond, channels }) => (
      Channel.count(cond).then(total => ({ total, channels }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};

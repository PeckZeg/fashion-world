const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));
const injectProps = reqlib('./utils/model-injector/video');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');

const Video = reqlib('./models/Video');

const ACTION = 'ADMIN_VIDEO_GET_FETCH_VIDEO_LIST';

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
      const { videoId } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = mergeQueryCond(cond, query);
      sort = setSort(sort, query);

      return { cond, skip, limit, sort };
    })

    // query video docs
    .then(({ cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort)
        .then(videos => injectProps(null, videos, 'toObject'))
        .then(videos => ({ cond, videos }))
    ))

    // count query docs
    .then(({ cond, videos }) => (
      Video.count(cond).then(total => ({ total, videos }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};

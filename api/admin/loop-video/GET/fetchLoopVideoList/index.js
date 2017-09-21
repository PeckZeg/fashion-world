const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const { mergeQueryCond, setSort } = reqlib('./utils/api-model')(require('./props'));
const injectProps = reqlib('./utils/model-injector/loop-video');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = 'ADMIN_LOOP_VIDEO_GET_FETCH_LOOP_VIDEO_LIST';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // transform query params
    .then(token => transformQuery(req.query))

    // validate query params
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

    // query loop video docs
    .then(({ cond, skip, limit, sort }) => (
      LoopVideo.find(cond).skip(skip).limit(limit).sort(sort)
        .then(loopVideos => injectProps(null, loopVideos, 'toObject'))
        .then(loopVideos => ({ cond, loopVideos }))
    ))

    // count docs
    .then(({ cond, loopVideos }) => (
      LoopVideo.count(cond).then(total => ({ total, loopVideos }))
    ))

    .then(result => handleResult(res, result, log))
    .catch(err => handleError(res, err));
};

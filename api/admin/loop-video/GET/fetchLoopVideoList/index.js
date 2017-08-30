const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = reqlib('./utils/transform-query');
const validateQuery = require('./validateQuery');
const setSort = reqlib('./utils/api-model/sort');
const setProps = reqlib('./utils/api-model/setProps');
const setTransProps = reqlib('./utils/api-model/setTransProps');
const setSearchCond = reqlib('./utils/api-model/search-cond');
const injectProps = reqlib('./utils/model-injector/loop-video');

const LoopVideo = reqlib('./models/LoopVideo');

const ACTION = config.apiActions['admin:loop-video:get:fetch-loop-video-list'];
const TRANSFORM_QUERY_PARAMS = { isPublished: Boolean, isRemoved: Boolean };
const QUERY_TO_COND_PARAMS = { isPublished: 'publishAt', isRemoved: 'removeAt' };
const SORT_PROPS = require('./SORT_PROPS.json');
const SEARCH_PROPS = require('./SEARCH_PROPS.json');

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // transform query params
    .then(token => transformQuery(req.query, TRANSFORM_QUERY_PARAMS))

    // validate query params
    .then(validateQuery)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const { videoId } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = setProps(cond, { videoId });
      cond = setTransProps(cond, query, QUERY_TO_COND_PARAMS);
      cond = setSearchCond(query, cond, SEARCH_PROPS);

      sort = setSort(query, sort, SORT_PROPS);

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

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

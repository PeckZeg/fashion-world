const validateParams = reqlib('./validate-models/client/video/fetch-video-list-query-params');
const transformQuery = reqlib('./utils/transform-query');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const fetchAvailableCategories = reqlib('./cache/models/available-categories');
const fetchAvailableChannels = reqlib('./cache/models/available-channels');

const TRANSFORM_QUERY_PARAMS = { isRecommend: Boolean };
const QUERY_TO_COND_PARAMS = { isRecommend: 'recommendAt' };

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // transform query params
    .then(() => transformQuery(req.query, TRANSFORM_QUERY_PARAMS))

    // validate query params
    .then(validateParams)

    // fetch available channels
    .then(query => (
      fetchAvailableChannels()
        .then(availableChannels => ({ query, availableChannels }))
    ))

    // fetch available categories
    .then(args => (
      fetchAvailableCategories()
        .then(availableCategories => ({ ...args, availableCategories }))
    ))

    .then(videos => res.send({ videos }))
    .catch(err => handleError(res, err));
};

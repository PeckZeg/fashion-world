const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = require('./transformQuery');
const validateQuery = require('./validateQuery');
const setSort = reqlib('./utils/api-model/sort');
const setSearchCond = reqlib('./utils/api-model/search-cond');
const setProps = reqlib('./utils/api-model/setProps');
const setTransProps = reqlib('./utils/api-model/setTransProps');
const injectProps = reqlib('./utils/model-injector/banner');

const Banner = reqlib('./models/Banner');

const ACTION = config.apiActions['admin:banner:get:fetch-banner-list'];
const SEARCH_PROPS = require('./SEARCH_PROPS.json');
const SORT_PROPS = require('./SORT_PROPS.json');
const QUERY_TO_COND_PARAMS = {
  isPublished: 'publishAt',
  isRemoved: 'removeAt'
};

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // transform query params
    .then(token => transformQuery(req.query))

    // validate query params
    .then(validateQuery)

    // generate query params
    .then(query => {
      const { offset, limit } = query;
      const { channelId, categoryId } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      cond = setProps(cond, { channelId, categoryId });
      cond = setTransProps(cond, query, QUERY_TO_COND_PARAMS);
      cond = setSearchCond(query, cond, SEARCH_PROPS);

      sort = setSort(query, sort, SORT_PROPS);

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

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

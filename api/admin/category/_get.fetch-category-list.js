const validateParams = reqlib('./validate-models/admin/category/fetch-category-list-query-params');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = reqlib('./utils/transform-query');
const injectChannels = reqlib('./utils/model-injector/category');
const setSort = reqlib('./utils/api-model/sort');
const setSearchCond = reqlib('./utils/api-model/search-cond');

const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');

const ACTION = config.apiActions['admin:category:get:fetch-category-list'];
const TRANSFORM_QUERY_PARAMS = { isPublished: Boolean, isRemoved: Boolean };
const QUERY_TO_COND_PARAMS = { isPublished: 'publishAt', isRemoved: 'removeAt' };
const SORT_PROPS = ['priority', 'publishAt', 'removeAt'];
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
      const { channelId, categoryId: _id } = query;
      const skip = offset * limit;
      let cond = {};
      let sort = { createAt: -1 };

      _.forEach({ channelId, _id }, (value, key) => {
        if (value !== void 0) {
          Object.assign(cond, { [key]: value });
        }
      });

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

    // query category docs
    .then(({ cond, skip, limit, sort }) => (
      Category.find(cond).skip(skip).limit(limit).sort(sort)
        .then(categories => ({ cond, categories }))
    ))

    //  count total category docs
    .then(({ cond, categories }) => (
      Category.count(cond).then(total => ({ total, categories }))
    ))

    // transform categories
    .then(({ total, categories }) => ({
      total,
      categories: categories.map(category => category.toObject())
    }))

    // inject channels
    .then(({ total, categories }) => (
      injectChannels(categories, 'toObject')
        .then(categories => ({ total, categories }))
    ))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

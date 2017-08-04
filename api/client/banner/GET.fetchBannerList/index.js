const injectChannels = reqlib('./utils/model-injector/banner');
const validateQueryParams = require('./validateQueryParams');
const handleError = reqlib('./utils/response/handle-error');

const Banner = reqlib('./models/Banner');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // validate query params
    .then(validateQueryParams)

    // gen query & sort options
    .then(queryParams => {
      const { offset, limit, type, channelId } = queryParams;
      const query = {
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: null
      };
      const skip = offset * limit;
      const sort = { priority: -1, publishAt: -1, createAt: -1 };

      _.forEach({ type, channelId }, (value, key) => {
        if (value !== void 0) {
          Object.assign(query, { [key]: value });
        }
      });

      return { query, skip, limit, sort };
    })

    // query banner docs
    .then(({ query, skip, limit, sort }) => (
      Banner.find(query).skip(skip).limit(limit).sort(sort)
    ))

    // inject props
    .then(banners => injectChannels(banners))

    .then(banners => res.send({ banners }))
    .catch(err => handleError(res, err));
};

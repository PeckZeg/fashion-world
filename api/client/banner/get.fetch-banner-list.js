const validateParams = reqlib('./validate-models/client/banner/fetch-banner-list-query-params');
const handleError = reqlib('./utils/catchMongooseError');

const Banner = reqlib('./models/Banner');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // validate query params
    .then(validateParams)

    // generate query & sort options
    .then(queryParams => {
      const { offset, limit, type, channelId } = queryParams;
      const sort = { priority: -1, createAt: -1 };
      const skip = offset * limit;
      let query = {
        removeAt: { $eq: null }
      };

      _.each({ type, channelId }, (value, key) => {
        if (value !== void 0) {
          Object.assign(query, { [key]: value });
        }
      });

      return { query, sort, skip, limit };
    })

    // query banner docs
    .then(({ query, sort, skip, limit }) => (
      Banner.find(query).skip(skip).limit(limit).sort(sort)
    ))

    // transform banners
    .then(banners => banners.map(banner => banner.toJSON({ virtuals: true })))

    .then(banners => res.send({ banners }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

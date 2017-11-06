const mapLimit = require('async/mapLimit');

const validateParams = reqlib('./validate-models/client/channel/fetch-list-query-params');
const handleError = reqlib('./utils/response/handle-error');
const transformQuery = reqlib('./utils/transform-query');

const Channel = reqlib('./models/Channel');
const Category = reqlib('./models/Category');
const TRANSFORM_QUERY_PARAMS = { injectCategories: Boolean };

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // transform query params
    .then(query => transformQuery(query, TRANSFORM_QUERY_PARAMS))

    // validate query params
    .then(validateParams)

    // generate query cond
    .then(query => {
      const { injectCategories } = query;
      const { offset, limit } = query;
      const cond = { publishAt: { $lte: new Date() }, removeAt: null };
      const skip = offset * limit;
      const sort = { priority: -1, publishAt: -1, createAt: -1 };

      return { cond, skip, limit, sort, injectCategories };
    })

    // query channel docs
    .then(({ cond, skip, limit, sort, injectCategories }) => (
      Channel.find(cond).skip(skip).limit(limit).sort(sort)
        .then(channels => ({ channels, injectCategories }))
    ))

    // inject categories
    .then(({ channels, injectCategories }) => {
      channels = channels.map(channel => channel.toJSON());

      if (!injectCategories) {
        return channels;
      }

      return new Promise((resolve, reject) => {
        mapLimit(channels, 3, (channel, cb) => {
          const cond = {
            channelId: channel._id,
            publishAt: { $lte: new Date() },
            removeAt: null
          };
          const sort = { priority: -1, publishAt: -1, createAt: -1 };

          Category.find(cond).sort(sort)
            .then(categories => {
              categories = categories.map(category => category.toJSON());
              cb(null, { ...channel, categories })
            })
            .catch(cb);
        }, (err, channels) => {
          if (err) return reject(err);
          resolve(channels);
        });
      });
    })

    .then(channels => res.send({ channels }))
    .catch(err => handleError(res, err));
};

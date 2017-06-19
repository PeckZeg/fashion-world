const validateParams = reqlib('./validate-models/client/video/fetch-recommend-video-list');
const handleError = reqlib('./utils/catchMongooseError');

const Video = reqlib('./models/Video');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

  // validate query params
  .then(validateParams)

  // generate aggregate params
  .then(query => {
    const { limit, channelId, categoryId } = query;
    let match = {};

    _.forEach({ channelId, categoryId }, (value, key) => {
      if (value !== void 0) {
        match = { ...match, [key]: value };
      }
    });

    return { match, limit };
  })

  .then(result => res.send(result))
  .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

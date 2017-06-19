const validateParams = reqlib('./validate-models/client/video/fetch-recommend-video-list');
const handleError = reqlib('./utils/catchMongooseError');
const fetchAvialableChannelIds = reqlib('./cache/fetch-available-channelIds');
const fetchAvialableCategoryIds = reqlib('./cache/fetch-available-video-channel-categoryIds');
const injectSources = reqlib('./utils/models/video/map-sources');
const injectChannels = reqlib('./utils/models/video/map-channels');
const injectCategories = reqlib('./utils/models/video/map-categories');

const Video = reqlib('./models/Video');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

  // validate query params
  .then(validateParams)

  // fetch available channels
  .then(query => new Promise((resolve, reject) => {
    fetchAvialableChannelIds()
      .then(channelIds => resolve({ query, channelIds }))
      .catch(reject);
  }))

  // fetch available categories
  .then(({ query, channelIds }) => new Promise((resolve, reject) => {
    fetchAvialableCategoryIds()
      .then(categoryIds => resolve({ query, channelIds, categoryIds }))
      .catch(reject);
  }))

  // generate aggregate params
  .then(({ query, channelIds, categoryIds }) => {
    const { limit, channelId, categoryId } = query;
    let match = {
      recommendAt: { $ne: null, $lte: new Date() },
      publishAt: { $ne: null, $lte: new Date() }
    };

    _.forEach({ channelId, categoryId }, (value, key) => {
      if (value !== void 0) {
        match = { ...match, [key]: value };
      }
    });

    return { match, limit };
  })

  // sample recommend video docs
  .then(({ match, limit }) => Video.aggregate().match(match).sample(limit))

  // transform to video model
  .then(videos => videos.map(video => new Video(video).toJSON({ virtuals: true })))

  // inject `source`
  .then(videos => injectSources(videos))

  // inject `channel`
  .then(videos => injectChannels(videos))

  // inject `category`
  .then(videos => injectCategories(videos))

  .then(result => res.send(result))
  .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

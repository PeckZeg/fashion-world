const validateParams = reqlib('./validate-models/client/video/search-query-params');
const transformQuery = reqlib('./utils/transform-query');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/user/auth-token');
const injectVideos = reqlib('./utils/model-injector/video');

const fetchAvailableCategories = reqlib('./cache/models/available-categories');
const fetchAvailableChannels = reqlib('./cache/models/available-channels');

const Video = reqlib('./models/Video');

const ACTION = config.apiActions['client:video:get:search-video'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate query params
    .then(token => (
      validateParams(req.query).then(query => ({ token, query }))
    ))

    // fetch available channels
    .then(args => (
      fetchAvailableChannels().then(channels => ({ ...args, channels }))
    ))

    // fetch available categories
    .then(args => (
      fetchAvailableCategories().then(categories => ({ ...args, categories }))
    ))

    // generate query params
    .then(({ token, query, channels, categories }) => {
      const { offset, limit } = query;
      const { channelId, categoryId } = query;
      const title = new RegExp(query.title, 'gi');
      const cond = {
        title,
        channelId: { $in: channels },
        categoryId: { $in: categories },
        publishAt: { $ne: null, $lte: new Date() },
        removeAt: null
      };
      const skip = offset * limit;
      const sort = { publishAt: -1, createAt: -1 };

      _.forEach({ channelId, categoryId }, (value, key) => {
        if (value !== void 0) {
          Object.assign(cond, { [key]: value });
        }
      });

      console.log({ channelId, categoryId });

      return { token, cond, limit, skip, sort };
    })

    // query video docs
    .then(({ token, cond, skip, limit, sort }) => (
      Video.find(cond).skip(skip).limit(limit).sort(sort)
        .then(videos => ({ token, cond, videos }))
    ))

    // inject props
    .then(({ token, cond, videos }) => (
      injectVideos(token, videos).then(videos => ({ cond, videos }))
    ))

    // count video docs
    .then(({ cond, videos }) => (
      Video.count(cond).then(total => ({ total, videos }))
    ))

    // inc video's views
    .then(args => {
      const { videos } = args;
      const videoIds = _.map(videos, '_id');
      const query = { _id: { $in: videoIds } };
      const doc = { $inc: { views: 1 } };
      const opts = { multi: true };

      return Video.update(query, doc, opts).then(videos => args);
    })

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

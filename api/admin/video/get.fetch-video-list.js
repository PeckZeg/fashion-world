const auth = reqlib('./utils/access-keys/account/auth');
const Video = reqlib('./models/Video');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/admin/video/fetch-list-params');
const mapSources = reqlib('./utils/models/video/map-sources');
const mapChannels = reqlib('./utils/models/video/map-channels');
const mapCategories = reqlib('./utils/models/video/map-categories');
const handleError = reqlib('./utils/catchMongooseError');

const ACTION = config.apiActions['admin:video:get:fetch-list'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    // transform query params
    .then(() => transformQuery(req.query, {
      isActive: Boolean,
      isRecommend: Boolean
    }))

    // validate query params
    .then(validateParams)

    // fetch video docs
    .then(query => new Promise((resolve, reject) => {
      const { offset, limit } = query;
      const cond = ['isRecommend', 'isActive'].reduce((cond, key) => {
        if (query[key] !== void 0) {
          cond = { ...cond, [key]: query[key] };
        }

        return cond;
      }, {});

      return Video.find(cond)
        .skip(offset * limit)
        .limit(limit)
        .sort({ createAt: -1 })
        .then(videos => resolve(videos))
        .catch(err => reject(handleError(err)));
    }))

    // transform video docs
    .then(videos => videos.map(video => video.toJSON({ virtuals: true })))

    // inject `source`
    .then(videos => mapSources(videos))

    // inject `channel`
    .then(videos => mapChannels(videos))

    // inject `category`
    .then(videos => mapCategories(videos))

    // fetch video count
    .then(videos => new Promise((resolve, reject) => {
      Video.count()
        .then(total => resolve({ total, videos }))
        .catch(err => reject(handleError(err)));
    }))

    .then(result => res.send(result))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

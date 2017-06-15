const Video = reqlib('./models/Video');
const SourceVideo = reqlib('./models/SourceVideo');
const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const validateParams = reqlib('./validate-models/client/video/list-query-params');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const mapObjectIds = reqlib('./utils/map-objectids');
const mapSources = reqlib('./utils/models/video/map-sources');
const mapChannels = reqlib('./utils/models/video/map-channels');
const mapCategories = reqlib('./utils/models/video/map-categories');
const CaaError = reqlib('./utils/CaaError');
const fetchAvialableChannelIds = reqlib('./cache/fetch-available-channelIds');
const fetchAvialableCategoryIds = reqlib('./cache/fetch-available-video-channel-categoryIds');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)
    // Transform Query Params
    .then(query => _.reduce(query, (query, value, key) => {
      switch (key) {
        case 'isRecommend':
          if (_.includes(['true', 'false'], value)) {
            Object.assign(query, { [key]: value === 'true' });
          }
          break;

        case 'tags':
          Object.assign(query, { [key]: value.split(',') });
          break;

        case 'sourceId':
          Object.assign(query, { [key]: value.split(',') });
          break;

        default:
          Object.assign(query, { [key]: value });
      }

      return query;
    }, {}))


    // Validate Query Params
    .then(validateParams)

    // Fetch Available Channels From Cache
    .then(query => new Promise((resolve, reject) => {
      fetchAvialableChannelIds()
        .then(channelIds => resolve({ query, channelIds }))
        .catch(reject);
    }))

    // Fetch Available Categories From Cache
    .then(({ query, channelIds }) => new Promise((resolve, reject) => {
      fetchAvialableCategoryIds()
        .then(categoryIds => resolve({ query, channelIds, categoryIds }))
        .catch(reject);
    }))

    // Query Videos
    .then(({ query, channelIds, categoryIds }) => {
      let { limit, offset, isRecommend, channelId, categoryId, sourceId, tags } = query;
      let sortOpts = { publishAt: -1 };
      let queryOpts = {
        channelId: { $in: channelIds },
        categoryId: { $in: categoryIds },
        removeAt: { $eq: null },
        publishAt: {
          $not: { $eq: null },
          $lte: new Date()
        }
      };

      if (isRecommend) {
        queryOpts = {
          ...queryOpts,
          recommendAt: { $not: { $eq: null } }
        };
        sortOpts = {
          recommendAt: -1,
          ...sortOpts
        };
      }

      if (tags.length) {
        queryOpts.$or = queryOpts.$or || [];
        queryOpts.$or.push(...tags.map(tags => ({ tags })));
      }

      if (sourceId.length) {
        queryOpts.sourceId = { $in: sourceId };
      }

      _.each({ channelId, categoryId }, ((value, prop) => {
        if (typeof value !== 'undefined') {
          Object.assign(queryOpts, { [prop]: value });
        }
      }));

      return Video
        .find(queryOpts)
        .skip(offset * limit)
        .limit(limit)
        .sort(sortOpts)
        .exec()
    })

    // transform video docs
    .then(videos => videos.map(video => video.toJSON({ virtuals: true })))

    // inject `source`
    .then(videos => mapSources(videos))

    // inject `channel`
    .then(videos => mapChannels(videos))

    // inject `category`
    .then(videos => mapCategories(videos))

    .then(videos => res.send({ videos }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

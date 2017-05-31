const Video = reqlib('./models/Video');
const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const validateParams = reqlib('./validate-models/client/video/list-query-params');
const catchMongooseError = reqlib('./utils/catchMongooseError');
const mapObjectIds = reqlib('./utils/map-objectids');
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
      let queryOpts = {
        isRemoved: false,
        isActive: true,
        publishAt: { $lte: new Date() },
        channelId: { $in: channelIds },
        categoryId: { $in: categoryIds }
      };

      if (tags.length) {
        queryOpts.$or = queryOpts.$or || [];
        queryOpts.$or.push(...tags.map(tags => ({ tags })));
      }

      if (sourceId.length) {
        queryOpts.sourceId = { $in: sourceId };
      }

      _.each({ channelId, isRecommend, categoryId }, ((value, prop) => {
        if (typeof value !== 'undefined') {
          Object.assign(queryOpts, { [prop]: value });
        }
      }));

      return Video
        .find(queryOpts)
        .skip(offset * limit)
        .limit(limit)
        .sort({ publishAt: -1 })
        .exec()
    })

    // Collect `channelId` & `categoryId`
    .then(videos => ({
      videos,
      channelIds: mapObjectIds(videos, 'channelId'),
      categoryIds: mapObjectIds(videos, 'categoryId')
    }))

    // Query Channels
    .then(({ videos, channelIds, categoryIds }) => new Promise((resolve, reject) => {
      VideoChannel.find({ _id: { $in: channelIds } })
        .then(channels => resolve({ videos, channels, categoryIds }))
        .catch(err => reject(catchMongooseError(err)));
    }))

    // Query Categories
    .then(({ videos, channels, categoryIds }) => new Promise((resolve, reject) => {
      VideoChannelCategory.find({ _id: { $in: categoryIds } })
        .then(categories => resolve({ videos, channels, categories }))
        .catch(err => reject(catchMongooseError(err)));
    }))

    // Transform Channels & Categories
    .then(({ videos, channels, categories }) => ({
      videos,
      channels: _.keyBy(channels, '_id'),
      categories: _.keyBy(categories, '_id')
    }))

    // Inject Channel & Category To Videos
    .then(({ videos, channels, categories }) => {
      videos = videos.map(video => Object.assign(
        video.toJSON({ virtuals: true }),
        {
          channel: channels[video.channelId],
          category: categories[video.categoryId]
        }
      ));

      return videos;
    })

    .then(videos => res.send({ videos }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

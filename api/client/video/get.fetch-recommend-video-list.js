const Video = reqlib('./models/Video');
const SourceVideo = reqlib('./models/SourceVideo');
const VideoChannel = reqlib('./models/VideoChannel');
const VideoChannelCategory = reqlib('./models/VideoChannelCategory');
const handleError = reqlib('./utils/catchMongooseError');
const transformQuery = reqlib('./utils/transform-query');
const validateParams = reqlib('./validate-models/client/video/list-query-params');
const mapSources = reqlib('./utils/models/video/map-sources');
const mapChannels = reqlib('./utils/models/video/map-channels');
const mapCategories = reqlib('./utils/models/video/map-categories');
const fetchAvialableChannelIds = reqlib('./cache/fetch-available-channelIds');
const fetchAvialableCategoryIds = reqlib('./cache/fetch-available-video-channel-categoryIds');
const caaError = reqlib('./utils/CaaError');

module.exports = (req, res, next) => {
  Promise.resolve(req.query)

    // transform query
    .then(query => transformQuery(query, {
      tags: 'StringArray'
    }))

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

    // query videos
    .then(({ query, channelIds, categoryIds }) => {
      let { limit, offset } = query;
      let queryOpts = {
        channelId: { $in: channelIds },
        categoryId: { $in: categoryIds },
        removeAt: { $eq: null },
        recommendAt: { $not: { $eq: null } },
        publishAt: {
          $not: { $eq: null },
          $lte: new Date()
        }
      };

      return Video
        .aggregate()
        .match(queryOpts)
        .sample(limit)
        .limit(limit)
        .sort({ recommendAt: -1, publishAt: -1 })
        .exec();
    })

    // // transform video docs
    // .then(videos => videos.map(video => video.toJSON({ virtuals: true })))
    //
    // // inject `source`
    // .then(videos => mapSources(videos))
    //
    // // inject `channel`
    // .then(videos => mapChannels(videos))
    //
    // // inject `category`
    // .then(videos => mapCategories(videos))

    .then(result => res.send(result))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

const injectSources = reqlib('./utils/models/video/map-sources');
const injectChannels = reqlib('./utils/models/video/map-channels');
const injectCategories = reqlib('./utils/models/video/map-categories');
const injectFavourites = reqlib('./utils/models/video/inject-favourites');
const injectFavouriteMarks = reqlib('./utils/models/video/inject-favourite-marks');
const injectCollections = reqlib('./utils/models/video/inject-collections');
const injectCollectedMarks = reqlib('./utils/models/video/inject-collected-marks');

/**
 *  返回一个注入各种值的列表
 *  @param {(object|object[])} videos: 视频列表
 *  @param {(object|string)} [userId]: 用户编号
 */
module.exports = (videos, userId) => Promise.resolve(videos)

  // init videos
  .then(videos => Array.isArray(videos) ? videos : [videos])

  // transform video docs
  .then(videos => videos.map(video => video.toJSON({ virtuals: true })))

  // inject `source`
  .then(injectSources)

  // inject `channel`
  .then(injectChannels)

  // inject `category`
  .then(injectCategories)

  // inject `favourites`
  .then(injectFavourites)

  // inject `isFavoured`
  .then(videos => injectFavouriteMarks(videos, userId))

  // inject `collections`
  .then(videos => injectCollections(videos, userId))

  // inject `isCollected`
  .then(videos => injectCollectedMarks(videos, userId));
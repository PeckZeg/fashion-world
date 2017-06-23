const injectSources = reqlib('./utils/models/video/map-sources');
const injectChannels = reqlib('./utils/models/video/map-channels');
const injectCategories = reqlib('./utils/models/video/map-categories');

module.exports = videos => Promise.resolve(videos)

  // init videos
  .then(videos => Array.isArray(videos) ? videos : [videos])

  // transform video docs
  .then(videos => videos.map(video => video.toJSON({ virtuals: true })))

  // inject `source`
  .then(videos => injectSources(videos))

  // inject `channel`
  .then(videos => injectChannels(videos))

  // inject `category`
  .then(videos => injectCategories(videos));

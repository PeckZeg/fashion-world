const mapObjectIds = reqlib('./utils/map-objectids');
const injectProps = require('../video');

const Video = reqlib('./models/Video');

module.exports = (token, loopVideos, handlerName = 'toJSON') => Promise.resolve(loopVideos)

  // map `videoId`
  .then(loopVideos => ({
    loopVideos,
    _id: mapObjectIds(loopVideos, 'videoId')
  }))

  // query video docs
  .then(({ loopVideos, _id }) => (
    Video.find({ _id })
      .then(videos => injectProps(token, videos, handlerName))
      .then(videos => ({ loopVideos, videos: _.keyBy(videos, '_id') }))
  ))

  // inject `video`
  .then(({ loopVideos, videos }) => loopVideos.map(loopVideo => ({
    ...loopVideo,
    video: videos[loopVideo.videoId] || null
  })))

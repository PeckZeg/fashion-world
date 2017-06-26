const injectSources = reqlib('./utils/models/live-video/inject-sources');

module.exports = liveVideos => Promise.resolve(liveVideos)

  // init
  .then(liveVideos => Array.isArray(liveVideos) ? liveVideos : [liveVideos])

  // transform live video docs
  .then(liveVideos => liveVideos.map(liveVideo => liveVideo.toJSON({ virtuals: true })))

  // inject `sources`
  .then(injectSources);

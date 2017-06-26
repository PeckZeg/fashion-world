const SourceVideo = reqlib('./models/SourceVideo');
const mapObjectIds = reqlib('./utils/map-objectids');

module.exports = liveVideos => Promise.resolve(liveVideos)

  // init
  .then(liveVideos => Array.isArray(liveVideos) ? liveVideos : [liveVideos])

  // map sourceId list
  .then(liveVideos => ({
    liveVideos,
    _id: mapObjectIds(liveVideos, 'sourceId')
  }))

  // fetch source video docs
  .then(({ liveVideos, _id }) => (
    SourceVideo.find({ _id }).then(sources => ({
      liveVideos,
      sources: _.keyBy(sources, '_id')
    }))
  ))

  // inject `sources`
  .then(({ liveVideos, sources }) => liveVideos.map(liveVideo => {
    const { sourceId: id } = liveVideo;
    const model = sources[id];
    const source = model ? model.toJSON({ virtuals: true }) : null;

    return { ...liveVideo, source };
  }));

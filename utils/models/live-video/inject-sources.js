const SourceVideo = reqlib('./models/SourceVideo');
const mapObjectIdArray = reqlib('./utils/map-objectid-array');

module.exports = liveVideos => Promise.resolve(liveVideos)

  // init
  .then(liveVideos => Array.isArray(liveVideos) ? liveVideos : [liveVideos])

  // map sourceId list
  .then(liveVideos => ({
    liveVideos,
    _id: mapObjectIdArray(liveVideos, 'sourceIds')
  }))

  // fetch source video docs
  .then(({ liveVideos, _id }) => (
    SourceVideo.find({ _id }).then(sources => ({
      liveVideos,
      sourceVideos: _.keyBy(sources, '_id')
    }))
  ))

  // inject `sources`
  .then(({ liveVideos, sourceVideos }) => liveVideos.map(liveVideo => {
    const sources = _.chain(liveVideo.sourceIds).map(sourceId => {
      const model = sourceVideos[sourceId];
      return model ? model.toJSON({ virtuals: true }) : null;
    }).compact().value();

    return { ...liveVideo, sources };
  }));

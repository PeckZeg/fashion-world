const SourceVideo = reqlib('./models/SourceVideo');
const mapObjectIds = reqlib('./utils/map-objectids');

module.exports = videos => Promise.resolve(videos)

  // init
  .then(videos => Array.isArray(videos) ? videos : [videos])

  // map sourceId list
  .then(videos => ({
    videos,
    _id: mapObjectIds(videos, 'sourceId')
  }))

  // fetch source docs
  .then(({ videos, _id }) => (
    SourceVideo.find({ _id }).then(sources => ({
      videos,
      sources: _.keyBy(sources, '_id')
    }))
  ))

  // inject source
  .then(({ videos, sources }) => videos.map(video => {
    const { sourceId: id } = video;
    const model = sources[id];
    const source = model ? model.toJSON({ virtuals: true }) : null;

    return { ...video, source };
  }));

const SourceVideo = reqlib('./models/SourceVideo');
const mapObjectIds = reqlib('./utils/map-objectids');
const handleError = reqlib('./utils/catchMongooseError');

module.exports = videos => Promise.resolve(Array.isArray(videos) ? videos : [videos])

  // map sourceId list
  .then(videos => ({ videos, sourceIds: mapObjectIds(videos, 'sourceId') }))

  // fetch source docs
  .then(({ videos, sourceIds }) => new Promise((resolve, reject) => {
    SourceVideo.find({ _id: sourceIds })
      .then(sources => resolve({ sources, videos }))
      .catch(err => reject(handleError(err)));
  }))

  // group by sourceId
  .then(({ videos, sources }) => ({ videos, sources: _.keyBy(sources, '_id') }))

  // inject video.source
  .then(({ videos, sources }) => videos.map(video => {
    const source = sources[video.sourceId];

    return { ...video, source: source ? source.toJSON({ virtuals: true }) : null }
  }));

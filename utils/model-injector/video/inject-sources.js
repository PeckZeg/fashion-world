const mapLimit = require('async/mapLimit');

const mapObjectIds = reqlib('./utils/map-objectids');
const createClient = reqlib('./redis/create-client');

const SourceVideo = reqlib('./models/SourceVideo');
const DefinitionVideo = reqlib('./models/DefinitionVideo');

module.exports = (videos, handlerName = 'toJSON') => Promise.resolve(videos)

  // generate source id list
  .then(videos => ({
    videos,
    _id: mapObjectIds(videos, 'sourceId')
  }))

  // query source docs
  .then(({ videos, _id }) => (
    SourceVideo.find({ _id }).then(sources => ({ videos, sources }))
  ))

  // transform sources
  .then(({ videos, sources }) => ({
    videos,
    sources: sources.map(source => source[handlerName]())
  }))

  // query each definition videos
  .then(({ videos, sources }) => new Promise((resolve, reject) => {
    mapLimit(sources, 8, (source, cb) => {
      const { _id: sourceId } = source;

      DefinitionVideo.find({ sourceId })
        .then(definitions => {
          definitions = definitions.map(definition => definition[handlerName]());
          cb(null, Object.assign(source, { definitions }));
        })
        .catch(cb);
    }, (err, sources) => {
      if (err) return reject(err);
      resolve({ videos, sources: _.keyBy(sources, '_id') });
    });
  }))

  // inject `source` props
  .then(({ videos, sources }) => videos.map(video => {
    const source = sources[video.sourceId] ? sources[video.sourceId] : null;

    return { ...video, source };
  }));

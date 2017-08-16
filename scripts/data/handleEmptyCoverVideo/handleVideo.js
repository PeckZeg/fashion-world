const SourceVideo = reqlib('./models/SourceVideo');
const Video = reqlib('./models/Video');

module.exports = video => Promise.resolve(video)

  // query source
  .then(video => (
    SourceVideo.findById(video.sourceId)
      .then(source => ({ video, source }))
  ))

  // sample screenshot as cover
  .then(({ video, source }) => {
    const cover = _.sample(source.screenshots);
    const doc = { $set: { cover } };
    const opts = { new: true };

    return Video.findByIdAndUpdate(video._id, doc, opts);
  });

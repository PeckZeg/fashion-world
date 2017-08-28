
const Video = reqlib('./models/Video');
const SourceVideo = reqlib('./models/SourceVideo');

module.exports = metadata => SourceVideo.findOne({
  filename: new RegExp(`${metadata.filename}|${metadata.filename.replace('－', '-')}|${metadata.filename.replace('-', '－')}`, 'i')
})

  .then(source => {
    if (!source) return null;

    const { _id: sourceId } = source;

    return Video.findOne({ sourceId })

      .then(video => {
        if (!video) return null;

        const { _id: videoId } = video;
        const {
          filename,
          title,
          category,
          author,
          rightsOwner,
          summary,
          tags,
          year,
          productionCountry,
        } = metadata;

        const abstract = summary.split('\n').join('');
        const originalTitle = title;
        const doc = {
          $set: {
            filename,
            title,
            category,
            author,
            rightsOwner,
            summary,
            tags,
            year,
            productionCountry,
            abstract,
            originalTitle,
            abstract,
            subtitle: ''
          }
        };
        const opts = { new: true };

        return Video.findByIdAndUpdate(videoId, doc, opts);
      });
  });

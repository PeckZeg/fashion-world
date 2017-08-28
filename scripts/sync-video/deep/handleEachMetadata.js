
const Video = reqlib('./models/Video');
const SourceVideo = reqlib('./models/SourceVideo');

const genRegexp = name => {
  const r = [name];
  const codes = ['－', '-', '－'];

  for (let i = 0; i < codes.length; i++) {
    for (let j = 0; j < codes.length; j++) {
      if (i !== j) {
        r.push(name.replace(codes[i], codes[j]));
      }
    }
  }

  return new RegExp(r.join('|'), 'i');
};

module.exports = metadata => SourceVideo.findOne({
  filename: genRegexp(metadata.filename)
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

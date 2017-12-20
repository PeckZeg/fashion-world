const Category = reqlib('./models/VideoChannelCategory');
const mapObjectIds = reqlib('./utils/map-objectids');

module.exports = videos => Promise.resolve(videos)

  // init videos
  .then(videos => Array.isArray(videos) ? videos : [videos])

  // map categoryId list
  .then(videos => ({ videos, _id: mapObjectIds(videos, 'categoryId') }))

  // fetch category docs
  .then(({ videos, _id }) => (
    Category.find({ _id }).then(categories => ({
      videos,
      categories: _.keyBy(categories, '_id')
    }))
  ))

  .then(({ videos, categories }) => videos.map(video => {
    const model = categories[video.categoryId];
    const category = model ? model.toJSON() : null;

    return { ...video, category };
  }));

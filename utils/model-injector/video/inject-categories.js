const Category = reqlib('./models/Category');

const mapObjectIds = reqlib('./utils/map-objectids');

module.exports = (videos, handlerName = 'toJSON') => Promise.resolve(videos)

  // generate `categoryId` list
  .then(videos => ({
    videos,
    _id: mapObjectIds(videos, 'categoryId')
  }))

  // query category docs
  .then(({ videos, _id }) => (
    Category.find({ _id }).then(categories => ({
      videos,
      categories: _.keyBy(categories, '_id')
    }))
  ))

  // inject `category`
  .then(({ videos, categories }) => videos.map(video => {
    const model = categories[video.categoryId];
    const category = model ? model[handlerName]() : null;

    return { ...video, category };
  }));

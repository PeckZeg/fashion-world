const Category = reqlib('./models/VideoChannelCategory');
const mapObjectIds = reqlib('./utils/map-objectids');
const handleError = reqlib('./utils/catchMongooseError');

module.exports = videos => Promise.resolve(
  Array.isArray(videos) ? videos : [videos]
)

  // map categoryId list
  .then(videos => ({ videos, categoryIds: mapObjectIds(videos, 'categoryId') }))

  // fetch category docs
  .then(({ videos, categoryIds }) => new Promise((resolve, reject) => {
    Category.find({ _id: categoryIds })
      .then(categories => resolve({ videos, categories }))
      .catch(err => reject(handleError(err)));
  }))

  // group by categoryId
  .then(({ videos, categories }) => ({
    videos,
    categories: _.keyBy(categories, '_id')
   }))

   .then(({ videos, categories }) => videos.map(video => {
     const model = categories[video.categoryId];
     const category = model ? model.toJSON() : null;

     return { ...video, category };
   }));

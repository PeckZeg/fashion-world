const mapObjectIds = reqlib('./utils/map-objectids');

const Category = reqlib('./models/Category');

module.exports = (banners, handler = 'toJSON') => Promise.resolve({
  banners,
  _id: mapObjectIds(banners, 'categoryId')
})

  // query category docs
  .then(({ banners, _id }) => (
    Category.find({ _id }).then(categories => ({
      banners,
      categories: _.keyBy(categories, '_id')
    }))
  ))

  // inject categories
  .then(({ banners, categories }) => banners.map(banner => {
    const { categoryId } = banner;
    const model = categories[categoryId];
    const category = model ? model[handler]() : null;

    return { ...banner, category };
  }))

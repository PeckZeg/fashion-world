const injectCategory = require('utils/models/inject/category');
const handleError = require('utils/response/handle-error');

const Category = require('models/Category');

module.exports = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    let category = await Category.findById(categoryId);

    if (!category || !category.publishAt || category.removeAt) {
      throw new ResponseError(404, 'category not found');
    }

    category = await injectCategory(category);

    res.send({ category });
  }

  catch (err) {
    handleError(res, err);
  }
};

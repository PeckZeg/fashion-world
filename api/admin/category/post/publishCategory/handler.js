const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');

const action = 'ADMIN_CATEGORY_POST_PUBLISH_CATEGORY';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { categoryId } = req.params;
    let category = await Category.findById(categoryId, 'publishAt');

    if (!category) {
      throw new ResponseError(404, 'category not found');
    }

    if (category.publishAt) {
      throw new ResponseError(403, 'category has been published');
    }

    const { publishAt = new Date() } = req.body;
    const doc = { $set: { publishAt, removeAt: null } };
    const opts = { new: true };

    category = await Category.findByIdAndUpdate(categoryId, doc, opts);
    category = await injectCategory(category, { handler: 'toObject' });

    handleResult(res, { category }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

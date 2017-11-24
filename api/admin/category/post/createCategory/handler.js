const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');

const action = 'ADMIN_CATEGORY_POST_CREATE_CATEGORY';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let category = new Category(req.body);

    category = await category.save();
    category = await injectCategory(category, { handler: 'toObject' });

    handleResult(res, { category }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

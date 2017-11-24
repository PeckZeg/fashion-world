const isEmpty = require('lodash/isEmpty');

const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');

const action = 'ADMIN_CATEGORY_PUT_UPDATE_CATEGORY';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { categoryId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };
    let category = await Category.findByIdAndUpdate(categoryId, doc, opts);
    category = await injectCategory(category, { handler: 'toObject' });

    handleResult(res, { category }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

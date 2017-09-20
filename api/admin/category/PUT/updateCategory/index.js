const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectProps = reqlib('./utils/model-injector/category');
const validateBody = require('./validateBody');

const Category = reqlib('./models/Category');

const ACTION = 'ADMIN_CATEGORY_PUT_UPDATE_CATEGORY';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `categoryId`
    .then(token => validateObjectId(req.params.categoryId))

    // validate body
    .then(categoryId => (
      validateBody(req.body).then(body => ({ categoryId, body }))
    ))

    // update category doc
    .then(({ categoryId, body }) => (
      Category.findByIdAndUpdate(categoryId, { $set: body }, { new: true })
    ))

    // transform category doc
    .then(category => {
      if (!category) {
        return Promise.reject(
          new ResponseError(404, 'category not found')
        );
      }

      return injectProps(category, 'toObject');
    })

    .then(category => handleResult(res, { category }, log))
    .catch(err => handleError(res, err));
};

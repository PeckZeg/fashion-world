const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const injectProps = reqlib('./utils/model-injector/category');

const Category = reqlib('./models/Category');

const ACTION = 'ADMIN_CATEGORY_GET_FETCH_CATEGORY_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `categoryId`
    .then(token => validateObjectId(req.params.categoryId))

    // query category doc
    .then(categoryId => Category.findById(categoryId))

    // ensure category exists
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

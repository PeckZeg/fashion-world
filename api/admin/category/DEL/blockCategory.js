const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/category');
const validateObjectId = reqlib('./utils/validate-objectid');

const Category = reqlib('./models/Category');

const ACTION = 'ADMIN_CATEGORY_DEL_BLOCK_CATEGORY';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `categoryId`
    .then(token => validateObjectId(req.params.categoryId))

    // query category doc
    .then(categoryId => Category.findById(categoryId, 'publishAt'))

    // ensure category exists
    .then(category => {
      if (!category) {
        return Promise.reject(
          new ResponseError(404, 'category not found')
        );
      }

      if (!category.publishAt) {
        return Promise.reject(
          new ResponseError(403, 'category has been blocked')
        );
      }

      const doc = {
        $set: {
          publishAt: null
        }
      };

      return Category.findByIdAndUpdate(category._id, doc, { new: true });
    })

    // inject props
    .then(category => injectProps(category, 'toObject'))

    .then(category => handleResult(res, { category }, log))
    .catch(err => handleError(res, err));
};

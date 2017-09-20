const injectChannels = reqlib('./utils/model-injector/category');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Category = reqlib('./models/Category');
const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:category:post:enable-category'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `categoryId`
    .then(keys => validateObjectId(req.params.categoryId))

    // update category doc
    .then(categoryId => (
      Category.findByIdAndUpdate(categoryId, {
        $set: {
          publishAt: new Date(),
          removeAt: null
        }
      }, OPTS)
    ))

    // check category exists
    .then(category => {
      if (!category) {
        return Promise.reject(new ResponseError(404, 'category not found'));
      }

      return category.toObject();
    })

    // inject channel
    .then(category => injectChannels(category, 'toObject'))

    .then(category => res.send({ category }))
    .catch(err => handleError(res, err));
};

const injectChannels = reqlib('./utils/model-injector/category');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Category = reqlib('./models/Category');
const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:category:del:destroy-category'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  Promise.resolve(req.params.categoryId)

    // validate `categoryId`
    .then(validateObjectId)

    // update category doc
    .then(categoryId => (
      Category.findByIdAndUpdate(categoryId, {
        $set: {
          publishAt: null,
          removeAt: new Date()
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

const injectChannels = reqlib('./utils/model-injector/category');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Category = reqlib('./models/Category');
const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:category:get:fetch-category-profile'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `categoryId`
    .then(keys => validateObjectId(req.params.categoryId))

    // query category doc
    .then(categoryId => Category.findById(categoryId))

    // check category exists
    .then(category => {
      if (!category) {
        return Promise.reject(new ResponseError(404, 'category not found'));
      }

      return category;
    })

    // transform to object
    .then(category => category.toObject())

    // inject channel
    .then(category => injectChannels(category, 'toObject'))

    .then(category => res.send({ category }))
    .catch(err => handleError(res, err));
};

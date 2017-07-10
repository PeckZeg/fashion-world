const validateParams = reqlib('./validate-models/admin/category/update-category-body-params');
const injectChannels = reqlib('./utils/model-injector/category');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Category = reqlib('./models/Category');
const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:category:put:update-category'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `categoryId`
    .then(keys => validateObjectId(req.params.categoryId))

    // validate body params
    .then(categoryId => (
      validateParams(req.body).then(body => ({ categoryId, body }))
    ))

    // update category
    .then(({ categoryId, body }) => (
      Category.findByIdAndUpdate(categoryId, { $set: body }, OPTS)
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
    .catch(err =>handleError(res, err));
};

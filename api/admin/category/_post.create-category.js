const validateParams = reqlib('./validate-models/admin/category/create-category-params');
const injectChannels = reqlib('./utils/model-injector/category');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Category = reqlib('./models/Category');
const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:category:post:create-category'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate body params
    .then(() => validateParams(req.body))

    // generate category model
    .then(body => new Category(body))

    // save category model
    .then(category => category.save())

    // transform category
    .then(category => category.toObject())

    // inject category
    .then(category => injectChannels(category, 'toObject'))

    .then(category => res.send({ category }))
    .catch(err => handleError(res, err));
};

const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const injectProps = reqlib('./utils/model-injector/category');
const validateBody = require('./validateBody');

const Category = reqlib('./models/Category');

const ACTION = 'ADMIN_CATEGORY_POST_CREATE_CATEGORY';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate body
    .then(token => validateBody(req.body))

    // generate category doc
    .then(body => new Category(body))

    // save doc
    .then(category => category.save())

    // inject props
    .then(category => injectProps(category, 'toObject'))

    .then(category => handleResult(res, { category }, log))
    .catch(err => handleError(res, err));
};

const validateParams = reqlib('./validate-models/admin/account/create-account-params');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const Account = reqlib('./models/Account');

const ACTION = config.apiActions['admin:account:post:create-account'];

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate body params
    .then(token => validateParams(req.body))

    // generate account doc
    .then(body => new Account(body))

    // save doc
    .then(account => account.save())

    // to object
    .then(account => account.toObject())

    .then(account => res.send({ account }))
    .catch(err => handleError(res, err));
};

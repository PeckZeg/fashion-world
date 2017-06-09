const auth = reqlib('./utils/access-keys/account/auth');
const Account = reqlib('./models/Account');
const validateParams = reqlib('./validate-models/admin/account/create-params');
const handleError = reqlib('./utils/catchMongooseError');

const ACTION = config.apiActions['admin:account:post:create-account'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    //  validate body
    .then(() => validateParams(req.body))

    //  generate account model
    .then(body => new Account(body))

    //  save model
    .then(account => account.save())

    .then(account => res.send({ account }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

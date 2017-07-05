const validateParams = reqlib('./validate-models/admin/account/login-params');
const createKeys = reqlib('./utils/keys/account/create-keys');
const handleError = reqlib('./utils/response/handle-error');

const Account = reqlib('./models/Account');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)

    // validate body params
    .then(validateParams)

    // query account doc
    .then(({ name, password }) => Account.findOne({ name, password }))

    // check account exists
    .then(account => {
      if (!account) {
        return Promise.reject(new ResponseError(400, 'name or password is invalid'));
      }

      return account;
    })

    // create keys
    .then(createKeys)

    .then(keys => res.send(keys))
    .catch(err => handleError(res, err));
};

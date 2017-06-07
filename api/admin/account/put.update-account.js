const auth = reqlib('./utils/access-keys/account/auth');
const Account = reqlib('./models/Account');
const validateObjectId = reqlib('./utils/validate-objectid');
const validateParams = reqlib('./validate-models/admin/account/update-params');
const handleError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');

const ACTION = config.apiActions['admin:account:put:update-account'];

module.exports = (req, res, next) => {
  auth(req.header('authorization'), ACTION, false)

    //  Validate ObjectId
    .then(() => validateObjectId(req.params.accountId))

    // Validate Update Body
    .then(accountId => new Promise((resolve, reject) => {
      validateParams(req.body)
        .then(body => resolve({ accountId, body }))
        .catch(reject);
    }))

    // Update Account
    .then(({ accountId, body }) => {
      return Account.findByIdAndUpdate(
        accountId,
        { $set: body },
        { new: true }
      )
    })

    // check account exists
    .then(account => new Promise((resolve, reject) => {
      if (!account) return reject(CaaError(404, 'account not found'));
      resolve(account);
    }))

    .then(account => res.send({ account }))
    .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

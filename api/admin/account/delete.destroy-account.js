const auth = reqlib('./utils/access-keys/account/auth');
const Account = reqlib('./models/Account');
const validateObjectId = reqlib('./utils/validate-objectid');
const handleError = reqlib('./utils/catchMongooseError');
const CaaError = reqlib('./utils/CaaError');

const ACTION = config.apiActions['admin:account:delete:destroy-account'];

module.exports = (req, res, next) => {
  console.log(req.header('authorization'));

  auth(req.header('authorization'), ACTION, false)

  //  Validate ObjectId
  .then(() => validateObjectId(req.params.accountId))

  // Destroy Account
  .then(accountId => Account.findByIdAndUpdate(
    accountId,
    { $set: { isActive: false, permissions: [] } },
    { new: true }
  ))

  // check account exists
  .then(account => new Promise((resolve, reject) => {
    if (!account) return reject(CaaError(404, 'account not found'));
    resolve(account);
  }))

  .then(account => res.send({ account }))
  .catch(err => res.status(err.status || 500).send({ message: err.message }));
};

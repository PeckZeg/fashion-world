const moment = require('moment');

const Account = reqlib('./models/account');
const validate = reqlib('./validate-models/admin/account/login-params');
const client = reqlib('./redis/client');
const createAccessKeys = reqlib('./utils/access-keys/account/generate');

const CACHE_DURATION = moment.duration(1, 'days');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)
    .then(body => validate(body))
    .then(params => {
      params = Object.assign(params, { isActive: true });
      return Account.findOne(params).exec()
    })
    .then(account => {
      return new Promise((resolve, reject) => {
        if (account) return resolve(account);

        let error = new Error('name or password is invalid');
        error.status = 400;
        reject(error);
      });
    })
    .then(account => createAccessKeys(account))
    .then(account => res.send(account))
    .catch(err => {
      res.status(err.status || 500).send({ message: err.message });
    });
};

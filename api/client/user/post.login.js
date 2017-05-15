const moment = require('moment');

const User = reqlib('./models/user');
const validate = reqlib('./validate-models/client/user/login-params');
const client = reqlib('./redis/client');
const createAccessKeys = reqlib('./utils/access-keys/user/generate');
const CaaError = reqlib('./utils/CaaError');

const CACHE_DURATION = moment.duration(1, 'days');

module.exports = (req, res, next) => {
  Promise.resolve(req.body)
    .then(body => validate(body))
    .then(params => User.findOne(params).exec())
    .then(user => new Promise((resolve, reject) => {
      if (!user) return reject(CaaError(400, 'name or password is invalid'));

      resolve(user);
    }))
    .then(account => createAccessKeys(account))
    .then(account => res.send(account))
    .catch(err => {
      res.status(err.status || 500).send({ message: err.message });
    });
};

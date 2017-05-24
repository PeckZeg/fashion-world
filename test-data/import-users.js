const mapLimit = require('async/mapLimit');
const crypto = require('crypto');

const globalMixins = require('../utils/global-mixins');
const User = reqlib('./models/User');
const USERS = require('./users.json');

const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

Promise.resolve(USERS)
  .then(users => new Promise((resolve, reject) => {
    mapLimit(USERS, 5, (user, cb) => {
      const { mobile, password } = user;
      const query = { mobile };
      const doc = { $set: user };

      if (password) {
        doc.$set.password = crypto.createHash('md5').update(password).digest('hex');
      }

      User.findOneAndUpdate(query, doc, opts)
        .then(user => cb(null, user.toJSON()))
        .catch(cb);
    }, (err, users) => {
      if (err) return reject(err);
      resolve(users);
    });
  }))
  .then(users => {
    console.log(users);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

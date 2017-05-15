const crypto = require('crypto');
const globalMixins = require('../utils/global-mixins');
const User = reqlib('./models/user');

const name = 'PeckZeg';
const password = crypto.createHash('md5').update('ju789olk').digest('hex');
const gender = 1;
const mobile = '13055818112';

User.findOne({ mobile }).then(user => {
  if (user) return Promise.resolve(user);

  user = new User({ name, password, gender, mobile });
  return user.save();
}).then(user => {
  console.log(user.toJSON());
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

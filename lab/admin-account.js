const crypto = require('crypto');

const globalMixins = require('../utils/global-mixins');
const Account = reqlib('./models/account');

const name = 'PeckZeg';
const password = crypto.createHash('md5').update('ju789olk').digest('hex');

// let account = new Account({ name, password });

Account.findOne({ name }).then(account => {
  if (account) {
    return Promise.resolve(account);
  }

  else {
    account = new Account({ name, password, isActive: true });
    return account.save();
  }
}).then(account => {
  console.log(account);
  process.exit(0);
}).catch(err => {
  console.error(err);
});

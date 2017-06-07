const mapLimit = require('async/mapLimit');
const crypto = require('crypto');
const Mock = require('mockjs');
const debug = require('debug')('account');
const globalMixins = require('../utils/global-mixins');
const Account = reqlib('./models/Account');

const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

Promise.resolve(_.chain(64).random(256).range().value())
  .then(accounts => new Promise((resolve, reject) => {
    debug(`即将导入 ${accounts.length} 个账号`);
    mapLimit(accounts, 5, (idx, cb) => {
      const name = Mock.mock('@first()');
      const password = crypto.createHash('md5').update(Mock.mock('@cword(8, 16)')).digest('hex');
      const query = { name };
      const doc = { name, password };

      Account.findOneAndUpdate(query, doc, opts)
        .then(account => {
          debug(`\t成功导入账号 ${idx}`);
          cb(null, account);
        })
        .catch(cb);
    }, (err, accounts) => {
      if (err) return reject(err);
      resolve(accounts);
    });
  }))
  .then(accounts => {
    debug(`完成测试账号导入，共计 ${accounts.length} 个`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

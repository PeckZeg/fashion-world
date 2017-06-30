const mapLimit = require('async/mapLimit');
const crypto = require('crypto');
const debug = require('debug')('import');
const Mock = require('mockjs');

const globalMixins = require('../utils/global-mixins');
const User = reqlib('./models/User');
const USERS = require('./users.json');

const { Random } = Mock;
const OPTS = { new: true, upsert: true, setDefaultsOnInsert: true };

Promise.resolve(+process.argv[2])

  // count user should be generated
  .then(count => {
    count = Number.isNaN(count) ? _.random(32, 256) : count;
    debug(`开始生成 ${count} 个用户数据`);

    return count;
  })

  // generate user docs
  .then(count => {
    const users = [];

    if (count - USERS.length > 0) {
      _.times(count - USERS.length, i => {
        users.push({
          name: Random.first(),
          password: Random.word(6, 32),
          gender: Random.pick(['unknown', 'secret', 'male', 'female']),
          mobile: Mock.mock(/9\d{10}/)
        });
      });
    }

    return [ ...USERS, ...users ];
  })

  // save user docs
  .then(users => new Promise((resolve, reject) => {
    mapLimit(users, 1, (user, cb) => {
      const { name, mobile, password } = user;
      const cond = { mobile };
      const doc = { $set: user };

      if (password) {
        doc.$set.password = crypto.createHash('md5').update(password).digest('hex');
      }

      debug(`\t正在创建第 ${users.indexOf(user) + 1} 个用户 [${name}]`);

      User.findOneAndUpdate(cond, doc, OPTS)
        .then(user => cb(null, user))
        .catch(cb);
    }, (err, users) => {
      if (err) return reject(err);
      resolve(users);
    });
  }))

  .then(users => {
    debug(`创建完毕！一共创建了 ${users.length} 个用户`);

    const user = new User(_.sample(users));

    debug('>>>>>>>>>>>>>>>> toJSON()');
    debug(user.toJSON());

    debug('>>>>>>>>>>>>>>>> toObject()');
    debug(user.toObject());

    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const appRootPath = require('app-root-path');
const colors = require('colors/safe');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const reqYaml = require('req-yaml');
const moment = require('moment');
const redis = require('redis');
const _ = require('lodash');
const config = require('../../config');
const ResponseError = require('../ResponseError');
const qiniu = require('qiniu');

require('app-module-path').addPath(process.cwd());

mongoose.Promise = global.Promise;

require('./promisify');

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

// bluebird.promisifyAll(qiniu.rs.BucketManager.prototype, {
//   filter: name => name === 'stat',
//   multiArgs: true
// });
// bluebird.promisifyAll(qiniu.rs.BucketManager.prototype);
//
// bluebird.promisifyAll(qiniu.form_up.FormUploader.prototype, {
//   filter: name => ['putFile', 'putStream'].includes(name),
//   multiArgs: true
// });
// bluebird.promisifyAll(qiniu.form_up.FormUploader.prototype);
//
// bluebird.promisifyAll(qiniu.fop.OperationManager.prototype, {
//   filter: name => ['pfop'].includes(name),
//   multiArgs: true
// });

Object.assign(global, module.exports = {
  reqlib: appRootPath.require,
  resolve: appRootPath.resolve,
  appRootPath: appRootPath,
  ResponseError,
  moment,
  reqYaml,
  colors,
  _,
  config
});

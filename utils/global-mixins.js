const appRootPath = require('app-root-path');
const colors = require('colors/safe');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const reqYaml = require('req-yaml');
const moment = require('moment');
const redis = require('redis');
const _ = require('lodash');
const config = require('../config');

mongoose.Promise = global.Promise;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

Object.assign(global, module.exports = {
  reqlib: appRootPath.require,
  resolve: appRootPath.resolve,
  appRootPath: appRootPath,
  moment,
  reqYaml,
  colors,
  _,
  config
});

const appRootPath = require('app-root-path');
const colors = require('colors/safe');
const mongoose = require('mongoose');
const reqYaml = require('req-yaml');
const moment = require('moment');
const _ = require('lodash');

mongoose.Promise = global.Promise;

Object.assign(global, module.exports = {
  reqlib: appRootPath.require,
  resolve: appRootPath.resolve,
  appRootPath: appRootPath,
  moment: moment,
  reqYaml: reqYaml,
  colors: colors,
  _
});

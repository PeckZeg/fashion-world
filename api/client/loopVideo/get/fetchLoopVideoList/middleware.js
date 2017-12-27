const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const genSearchParams = require('utils/schema/genSearchParams');
const genMiddleware = require('utils/router/genMiddleware');
const genListParams = require('utils/schema/genListParams');
const genSortParams = require('utils/schema/genSortParams');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');
const props = require('./props');

const schema = new mongoose.Schema({
  ...genListParams(),
  ...genParams(props),
  ...genSortParams(props),
  ...genSearchParams(props),
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('client'), schema));

module.exports = genMiddleware(validator);

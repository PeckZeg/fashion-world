const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genSearchParams = require('utils/schema/genSearchParams');
const genMiddleware = require('utils/router/genMiddleware');
const genListParams = require('utils/schema/genListParams');
const genSortParams = require('utils/schema/genSortParams');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');
const props = require('./props');

const { Schema } = mongoose;

const schema = new Schema({
  ...genListParams(),
  ...genParams(props),
  ...genSortParams(props),
  ...genSearchParams(props),
}, { _id: false });

module.exports = genMiddleware(genValidator(schema));

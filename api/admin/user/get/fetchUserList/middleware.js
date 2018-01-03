const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genSearchParams = require('utils/schema/genSearchParams');
const genMiddleware = require('utils/router/genMiddleware');
const genListParams = require('utils/schema/genListParams');
const genSortParams = require('utils/schema/genSortParams');
const genParams = require('utils/schema/genParams');
const props = require('./props');

const schema = new mongoose.Schema({
  ...genListParams(),
  ...genParams(props),
  ...genSortParams(props),
  ...genSearchParams(props),
}, { _id: false });

module.exports = genMiddleware(genValidator(schema));

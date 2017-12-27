const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 32 },
  value: { type: String, required: true, minlength: 1, maxlength: 512 },
  priority: Number
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('admin'), schema));

module.exports = genMiddleware(validator, 'body');

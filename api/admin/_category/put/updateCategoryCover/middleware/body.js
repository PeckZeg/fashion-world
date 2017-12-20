const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  key: { type: String, required: true }
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('admin'), schema));

module.exports = genMiddleware(validator, 'body');

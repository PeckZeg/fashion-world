const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');

const { ObjectId } = mongoose.Schema.Types;
const { GENDERS } = require('models/User/genders');

const schema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxLength: 24 },
  gender: { type: String, enum: GENDERS },
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('admin'), schema));

module.exports = genMiddleware(validator, 'body');

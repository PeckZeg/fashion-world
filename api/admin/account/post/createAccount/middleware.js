const mongoose = require('mongoose');

const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const genParams = require('utils/schema/genParams');
const validate = require('utils/request/validate');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxLength: 15 },
  password: { type: String, required: true, match: matchPassword },
  permissions: [String]
}, { _id: false });

const validator = validate(
  mongoose.model('AdminCreateAccountBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

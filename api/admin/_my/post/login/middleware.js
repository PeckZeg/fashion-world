const mongoose = require('mongoose');

const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const validate = require('utils/request/validate');

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxLength: 15 },
  password: { type: String, required: true, match: matchPassword }
}, { _id: false });

const validator = validate(
  mongoose.model('AdminMyLoginBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

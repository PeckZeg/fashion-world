const mongoose = require('mongoose');

const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const validate = require('utils/request/validate');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  password: { type: String, required: true, match: matchPassword }
}, { _id: false });

const validator = validate(
  mongoose.model('MyLoginBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

const mongoose = require('mongoose');

const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const matchCode = require('utils/schema/match/code');
const validate = require('utils/request/validate');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  password: { type: String, required: true, match: matchPassword },
  code: { type: String, required: true, match: matchCode }
}, { _id: false });

const validator = validate(
  mongoose.model('MyRegisterBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

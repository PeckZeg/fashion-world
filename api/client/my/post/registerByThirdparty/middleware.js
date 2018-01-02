const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const matchCode = require('utils/schema/match/code');
const validate = require('utils/request/validate');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  code: { type: String, required: true, match: matchCode },
  accessToken: { type: String, required: true },
  openid: { type: String, required: true },
  unionid: { type: String, required: true }
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('client'), schema));

module.exports = genMiddleware(validator, 'body');

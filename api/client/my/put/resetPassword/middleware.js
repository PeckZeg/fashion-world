const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const matchCode = require('utils/schema/match/code');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  password: { type: String, required: true, match: matchPassword },
  code: { type: String, required: true, match: matchCode }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema, 'client'), 'body');

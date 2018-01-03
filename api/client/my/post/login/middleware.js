const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  password: { type: String, required: true, match: matchPassword }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema, 'client'), 'body');

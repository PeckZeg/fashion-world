const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const matchCode = require('utils/schema/match/code');

const { Schema } = mongoose;

const schema = new Schema({
  accessToken: { type: String, required: true },
  openid: { type: String, required: true },
  unionid: { type: String, required: true }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema, 'client'), 'body');

const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const matchCode = require('utils/schema/match/code');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  code: { type: String, required: true, match: matchCode }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema, 'client'), 'body');

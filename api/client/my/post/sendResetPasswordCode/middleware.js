const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const matchMobile = require('utils/schema/match/mobile');
const validate = require('utils/request/validate');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile }
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('client'), schema));

module.exports = genMiddleware(validator, 'body');

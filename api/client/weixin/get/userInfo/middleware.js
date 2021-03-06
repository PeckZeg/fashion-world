const uniqueId = require('lodash/uniqueId');
const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const validate = require('utils/request/validate');

const schema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  openid: { type: String, required: true }
}, { _id: false });

const validator = validate(mongoose.model(uniqueId('client'), schema));

module.exports = genMiddleware(validator);

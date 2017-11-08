const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const validate = require('utils/request/validate');

const schema = new mongoose.Schema({
  code: { type: String, required: true },
  type: { type: String, required: true, enum: Object.keys(config.weixin), default: 'web' }
}, { _id: false });

const validator = validate(
  mongoose.model('ClientWeixinFetchAccessTokenQueryParams', schema)
);

module.exports = genMiddleware(validator);

const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const validate = require('utils/request/validate');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  userId: { type: ObjectId, required: true },
  accessToken: { type: String, required: true },
  openid: { type: String, required: true },
  unionid: { type: String, required: true }
}, { _id: false });

const validator = validate(
  mongoose.model('ClientBindWeixinBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

const mongoose = require('mongoose');

const matchPassword = require('utils/schema/match/password');
const genMiddleware = require('utils/router/genMiddleware');
const validate = require('validate-models/validate');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32 },
  password: { type: String, match: matchPassword },
}, { _id: false });

const validator = validate(
  mongoose.model('AdminUpdateMyProfileBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

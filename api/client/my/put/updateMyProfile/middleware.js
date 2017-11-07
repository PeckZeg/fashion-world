const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const validate = require('utils/request/validate');
const { GENDERS } = require('models/User/genders');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 16 },
  gender: { type: String, enum: GENDERS }
});

const validator = validate(
  mongoose.model('UpdateMyProfileBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

const schema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxLength: 16 },
  gender: { type: String, enum: ['unknown', 'secret', 'male', 'female'] }
}, { _id: false });

module.exports = validate(
  mongoose.model('ClientUpdateUserPersonalProfileBodyParams', schema)
);

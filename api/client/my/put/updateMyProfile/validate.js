const mongoose = require('mongoose');

const validate = reqlib('./utils/request/validate');
const { GENDERS } = reqlib('./models/User/genders');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 16 },
  gender: { type: String, enum: GENDERS }
});

module.exports = validate(
  mongoose.model('UpdateMyProfileBodyParams', schema)
);

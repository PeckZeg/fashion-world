const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const matchMobile = reqlib('./utils/schema/match/mobile');
const validate = reqlib('./utils/request/validate');

const { Schema } = mongoose;

const schema = new Schema({
  mobile: { type: String, required: true, match: matchMobile },
  password: { type: String, required: true, match: matchPassword }
}, { _id: false });

module.exports = validate(
  mongoose.model('MyLoginBodyParams', schema)
);

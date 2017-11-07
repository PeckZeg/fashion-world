const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const validate = reqlib('./validate-models/validate');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 32 },
  password: { type: String, match: matchPassword },
}, { _id: false });

module.exports = validate(
  mongoose.model('AdminUpdateMyProfileBodyParams', schema)
);

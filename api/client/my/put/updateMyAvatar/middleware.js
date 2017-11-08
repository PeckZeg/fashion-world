const mongoose = require('mongoose');

const genMiddleware = require('utils/router/genMiddleware');
const validate = require('validate-models/validate');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const schema = new Schema({
  avatar: { type: String, required: true }
}, { _id: false });

const validator = validate(
  mongoose.model('ClientUpdateMyAvatarBodyParams', schema)
);

module.exports = genMiddleware(validator, 'body');

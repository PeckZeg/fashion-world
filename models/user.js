const mongoose = require('mongoose');
const connection = require('../utils/mongodb-connection');
const toJSON = require('../utils/schema/toJSON');

const { Schema, Types } = mongoose;
const transform = toJSON();

var schema = new Schema({
  avatar: String,
  name: { type: String, required: true, minlength: 3, maxLength: 16 },
  password: { type: String, required: true },
  gender: { type: Number, required: true, enum: [0, 1, 2] },
  mobile: { type: String, unique: true, validate: { validator: v => /\d{11}/.test(v) } },
  createAt: { type: Date, default: Date.now },
  registerAt: { type: Date, default: Date.now },
  source: {
    platform: String,
    deviceId: String
  }
});

schema.options.toJSON = { transform };

module.exports = connection.model('User', schema);

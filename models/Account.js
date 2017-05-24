const mongoose = require('mongoose');
const connection = require('../utils/mongodb-connection');
const toJSON = require('../utils/schema/toJSON');

const { Schema, Types } = mongoose;
// const { ObjectId } = Types;

const transform = toJSON();

var schema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 3, maxLength: 16 },
  password: { type: String, required: true },
  avatar: String,
  isActive: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  permissions: [String]
});

schema.options.toJSON = { transform };

module.exports = connection.model('Account', schema);

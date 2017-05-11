const globalMixins = require('../utils/global-mixins');

const mongoose = require('mongoose');
const connection = reqlib('utils/mongodb-connection');

const { Schema, Types } = mongoose;
const { ObjectId } = Types;

var schema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 3, maxLength: 15 },
  password: { type: String, required: true },
  avatar: String,
  isActive: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  permissions: [String]
});

module.exports = connection.model('Account', schema);

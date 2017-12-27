const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const connection = reqlib('./utils/mongodb-connection');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema, Types } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 3, maxlength: 32 },
  password: { type: String, required: true, match: matchPassword },
  avatar: { type: String, default: null },
  permissions: [String],
  activeAt: { type: Date, default: null },
  removeAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
}, { toJSON, toObject });

module.exports = connection.model('Account', schema);

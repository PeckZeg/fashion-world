const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema, Types } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 32 },
  value: { type: String, maxlength: 512 },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
}, { toJSON, toObject });

module.exports = connection.model('About', schema);

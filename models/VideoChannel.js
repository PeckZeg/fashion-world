const mongoose = require('mongoose');
const connection = require('../utils/mongodb-connection');
const transform = reqlib('./utils/schema/toJSON')();

const { Schema, Types } = mongoose;

let schema = new Schema({
  name: { type: String, required: true, minlength: 1, maxLength: 64 },
  priority: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createAt: { type: Date, default: Date.now },
  removeAt: Date,
});

schema.options.toJSON = { transform };

module.exports = connection.model('VideoChannel', schema);

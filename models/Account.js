const mongoose = require('mongoose');
const connection = require('../utils/mongodb-connection');
const toJSON = require('../utils/schema/toJSON');

const { Schema, Types } = mongoose;

const transform = toJSON();

var schema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 3, maxLength: 32 },
  password: { type: String, required: true, match: [/^[a-f0-9]{32}$/i, 'password `{VALUE}` should be a md5 string'] },
  avatar: { type: String, default: '' },
  isActive: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  permissions: [String]
});

schema.options.toJSON = { transform };

module.exports = connection.model('Account', schema);

const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  cover: { type: String, default: null },
  name: { type: String, required: true, minlength: 1, maxLength: 64 },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
}, { toJSON, toObject });

module.exports = connection.model('Channel', schema);

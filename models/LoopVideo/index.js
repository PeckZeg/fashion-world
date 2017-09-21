const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  videoId: { type: ObjectId, required: true },
  cover: { type: String, default: '' },
  title: { type: String, minlength: 1, maxlength: 65535, default: null },
  subtitle: { type: String, minlength: 1, maxlength: 65535, default: null },
  abstract: { type: String, minlength: 1, maxlength: 65535, default: null },
  summary: { type: String, minlength: 1, maxlength: 65535, default: null },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
}, { toJSON, toObject });

module.exports = connection.model('LoopVideo', schema);

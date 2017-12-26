const mongoose = require('mongoose');
const path = require('path');
const url = require('url');

const connection = require('utils/mongodb-connection');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;
const { TYPES, DEFAULT_TYPE } = require('./types');

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, default: null },
  title: { type: String, required: true, minlength: 2, maxlength: 64, default: '' },
  description: { type: String, minlength: 1, maxlength: 2048, default: '' },
  type: { type: String, required: true, enum: TYPES, default: DEFAULT_TYPE },
  value: { type: Mixed, required: true, default: '' },
  cover: { type: String, default: null },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
}, { toJSON, toObject });

module.exports = connection.model('Banner', schema);

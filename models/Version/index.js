const mongoose = require('mongoose');

const connection = require('utils/mongodb-connection');
const unsetProps = require('utils/schema/unset-props');
const transform = require('utils/schema/transform');
const matchUrl = require('utils/schema/match/url');
const toObject = require('./toObject');
const toJSON = require('./toJSON');
const types = require('./types');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  cover: { type: String, default: null },
  type: { type: String, lowercase: true, enum: types, required: true },
  version: {
    major: { type: Number, min: 0, default: 0 },
    minor: { type: Number, min: 0, max: 99, default: 0 },
    revision: { type: Number, min: 0, max: 99, default: 0 },
  },
  title: { type: String, maxlength: 32, default: null },
  description: { type: String, maxlength: 1024, default: null },
  link: { type: String, match: matchUrl, default: null },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now }
}, { toJSON, toObject });

module.exports = connection.model('Version', schema);

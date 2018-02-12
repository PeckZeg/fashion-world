const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');
const matchUrl = require('utils/schema/match/url');
const types = require('models/Version/types');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  key: String,
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
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');

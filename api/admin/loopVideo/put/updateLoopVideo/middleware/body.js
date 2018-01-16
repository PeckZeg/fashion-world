const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  videoId: ObjectId,
  title: { type: String, minlength: 1, maxlength: 64 },
  subtitle: { type: String, minlength: 1, maxlength: 128 },
  abstract: { type: String, minlength: 1, maxlength: 256 },
  summary: { type: String, minlength: 1, maxlength: 65535 },
  priority: { type: Number, default: 0 },
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');

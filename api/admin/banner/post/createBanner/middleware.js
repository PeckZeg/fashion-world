const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;
const { TYPES } = require('models/Banner/types');

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  categoryId: ObjectId,
  title: { type: String, required: true, minlength: 2, maxlength: 64 },
  description: { type: String, maxlength: 2048 },
  type: { type: String, required: true, enum: TYPES },
  value: { type: Mixed, required: true, default: '' },
  priority: { type: Number, default: 0 },
  key: String
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');

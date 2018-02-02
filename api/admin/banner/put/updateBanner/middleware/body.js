const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;
const { TYPES } = require('models/Banner/types');

const schema = new Schema({
  channelId: ObjectId,
  categoryId: ObjectId,
  title: { type: String, minlength: 2, maxlength: 64 },
  description: { type: String, maxlength: 2048 },
  type: { type: String, enum: TYPES },
  value: { type: Mixed },
  priority: Number
}, { _id: false });

module.exports = genMiddleware(genValidator(schema), 'body');

const mongoose = require('mongoose');

const connection = require('../utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'removeAt',
  'removeBy'
];

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, required: true },
  views: { type: Number, default: 0 },
  tags: [String],
  keywords: [String],
  publishBeginAt: { type: Date, default: null },
  publishEndAt: { type: Date, default: null },
  recommendBeginAt: { type: Date, default: null },
  recommendEndAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null },
  removeBy: { type: ObjectId, default: null }
}, {});

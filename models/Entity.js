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
  type: { type: String, enum: ['video'] },
  channelId: { type: ObjectId, required: true },
  categoryId: { type: ObjectId, required: true },
  title: { type: String, minlength: 1, maxLength: 64 },
  abstract: { type: String, minlength: 1, maxLength: 128 },
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
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret = transform(doc, ret, options);
      ret = unsetProps(ret, TRANSFORM_TO_JSON_PROP_BLACK_LIST);

      return ret;
    }
  },

  toObject: { virtuals: true, transform }
});

module.exports = connection.model('Entity', schema);

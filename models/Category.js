const mongoose = require('mongoose');

const connection = require('../utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'removeAt'
];

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  name: { type: String, required: true, minlength: 1, maxLength: 64 },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null },
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret = transform(doc, ret, options);
      ret = unsetProps(ret, TRANSFORM_TO_JSON_PROP_BLACK_LIST);

      return ret;
    }
  },

  toObject: {
    virtuals: true,
    transform
  }
});

module.exports = connection.model('Category', schema);

const mongoose = require('mongoose');

const connection = require('../utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');

const { Schema, Types } = mongoose;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'password',
  'removeAt'
];

const schema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 3, maxLength: 32 },
  password: { type: String, required: true, match: [/^[a-f0-9]{32}$/i, 'invalid password'] },
  avatar: { type: String, default: null },
  permissions: [String],
  activeAt: { type: Date, default: null },
  removeAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
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

module.exports = connection.model('Account', schema);

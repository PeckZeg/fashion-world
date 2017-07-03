const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toUrl');

const { Schema, Types } = mongoose;
const { NODE_ENV } = process.env;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'avatar',
  'password'
];

var schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 16, default: '' },
  password: { type: String, required: true, match: /^[a-f0-9]{32}$/, default: '' },
  gender: { type: String, enum: ['unknown', 'secret', 'male', 'female'], default: 'secret' },
  mobile: { type: String, unique: true, match: /^\d{11}$/i },
  avatar: { type: String, default: null },
  createAt: { type: Date, default: Date.now },
  registerAt: { type: Date, default: Date.now }
}, {
  toJSON: {
    virtuals: true,

    transform: (doc, ret, options) => {
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

schema.virtual('avatarUrl').get(function() {
  return toUrl(this.cover);
});

module.exports = connection.model('User', schema);

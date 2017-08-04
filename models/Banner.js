const mongoose = require('mongoose');
const url = require('url');
const path = require('path');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toResFtpUrl');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;

const transformRet = ret => {
  ret.cover = toUrl(ret.cover);
  return ret;
};

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'priority',
  'removeAt'
];

const schema = new Schema({
  channelId: { type: ObjectId, required: true },
  title: { type: String, required: true, minlength: 2, maxlength: 64, default: '' },
  type: { type: String, required: true, minlength: 2, maxlength: 64, default: 'url' },
  value: { type: Mixed, required: true, default: '' },
  cover: { type: String, default: null },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret = transform(doc, ret, options);
      ret = unsetProps(ret, TRANSFORM_TO_JSON_PROP_BLACK_LIST);
      ret = transformRet(ret);

      return ret;
    }
  },

  toObject: {
    virtuals: true,
    transform
  }
});

module.exports = connection.model('Banner', schema);

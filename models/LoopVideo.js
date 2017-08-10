const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toResFtpUrl');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transformRet = ret => {
  ret.cover = toUrl(ret.cover || DEFAULT_COVER);
  return ret;
};

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'removeAt'
];

const schema = new Schema({
  videoId: { type: ObjectId, required: true },
  cover: { type: String, default: '' },
  title: { type: String, minlength: 1, maxLength: 65535, default: null },
  subtitle: { type: String, maxLength: 65535, default: null },
  abstract: { type: String, minlength: 1, maxLength: 65535, default: null },
  summary: { type: String, minlength: 1, maxLength: 65535, default: null },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
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

  toObject: { virtuals: true, transform }
});

module.exports = connection.model('LoopVideo', schema);

const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toResFtpUrl');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { defaultCover: DEFAULT_COVER } = config.model.video;

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
  title: { type: String, minlength: 1, maxlength: 65535, default: null },
  subtitle: { type: String, minlength: 1, maxlength: 65535, default: null },
  abstract: { type: String, minlength: 1, maxlength: 65535, default: null },
  summary: { type: String, minlength: 1, maxlength: 65535, default: null },
  priority: { type: Number, default: 0 },
  publishAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
  removeAt: { type: Date, default: null }
}, {
  toJSON: {
    virtuals: true,
    transform(doc, ret, opts) {
      ret = transform(doc, ret, opts);
      ret = unsetProps(ret, TRANSFORM_TO_JSON_PROP_BLACK_LIST);
      ret = transformRet(ret);

      return ret;
    }
  },

  toObject: {
    virtuals: true,
    transform(doc, ret, opts) {
      ret = transform(doc, ret, opts);
      ret = transformRet(ret);

      return ret;
    }
  }
});

module.exports = connection.model('LoopVideo', schema);

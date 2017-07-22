const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toResFtpUrl');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'filename',
  'filepath',
];

const schema = new Schema({
  sourceId: { type: ObjectId, required: true },
  sha1: { type: String, unique: true, required: true, index: true },
  filename: { type: String, default: '' },
  filepath: { type: String, default: '' },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  size: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  definition: { type: String, default: null },
  bitRate: { type: Number, default: null },
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

schema.virtual('url').get(function() {
  return toUrl(this.filepath);
});

module.exports = connection.model('DefinitionVideo', schema);

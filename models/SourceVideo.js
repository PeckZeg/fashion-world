const mongoose = require('mongoose');
// const url = require('url');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toResFtpUrl');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'sha1',
  'ftp',
  'filename',
  'filepath',
  'width',
  'height',
  'size',
  'bitRate'
];

const transformRet = ret => {
  ret.screenshots = ret.screenshots.map(pathname => toUrl(pathname));

  return ret;
};

const schema = new Schema({
  sha1: { type: String, unique: true, index: true },
  ftp: { type: String, default: '' },
  filename: { type: String, default: '' },
  filepath: { type: String, default: '' },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  size: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  bitRate: { type: Number, default: null },
  screenshots: [String],
  // definitions: [ObjectId],
  uploadAt: { type: Date, default: null },
  createAt: { type: Date, default: Date.now },
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
    transform(doc, ret, options) {
      ret = transform(doc, ret, options);
      ret = transformRet(ret);

      return ret;
    }
   }
});

module.exports = connection.model('SourceVideo', schema);

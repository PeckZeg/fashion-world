const mongoose = require('mongoose');
const url = require('url');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toUrl');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'filename',
  'filepath',
  'screenshots'
];

const schema = new Schema({
  sourceId: { type: ObjectId, required: true },
  sha1: { type: String, unique: true, index: true },
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
  return url.resolve(
    config.sourceVideo.hostname,
    path.join(config.sourceVideo.basePathname, this.filepath)
  );
});

schema.virtual('screenshotUrls').get(function() {
  return this.screenshots.map(screenshot => toUrl(screenshot));
});

module.exports = connection.model('DefinitionVideo', schema);

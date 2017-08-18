const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const unsetProps = reqlib('./utils/schema/unset-props');
const transform = reqlib('./utils/schema/transform');
const toUrl = reqlib('./utils/toResFtpUrl');

const { Schema, Types } = mongoose;
const DEFAULT_AVATAR = config.model.user.defaultAvatar;

const TRANSFORM_TO_JSON_PROP_BLACK_LIST = [
  'mobile',
  'password'
];

const transformRet = ret => {
  ret.avatar = toUrl(ret.avatar || DEFAULT_AVATAR);
  return ret;
};

const schema = new Schema({
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
      ret = transformRet(ret);

      return ret;
    }
  },

  toObject: {
    virtuals: true,
    transform
  }
});

module.exports = connection.model('User', schema);

const mongoose = require('mongoose');
const CaaError = reqlib('./utils/CaaError');

const validate = reqlib('./validate-models/validate');

let schema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxLength: 32 },
  password: { type: String, match: [/^[a-f0-9]{32}$/i, 'password `{VALUE}` should be a md5 string'] },
  avatar: String,
  isActive: Boolean,
  permissions: [String]
}, { _id: false });

schema.options.toJSON = {
  transform(doc, ret) {
    if (!ret.permissions.length) {
      delete ret.permissions;
    }

    return ret;
  }
};

let Params = mongoose.model('AdminAccountUpdateParams', schema);

module.exports = validate(Params, (doc, ret, body) => {
  if (_.has(body, 'permissions') && !body.permissions.length) {
    ret.permissions = [];
  }

  return ret;
});

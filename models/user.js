const mongoose = require('mongoose');
const connection = require('../utils/mongodb-connection');
const toJSON = require('../utils/schema/toJSON');

const { Schema, Types } = mongoose;

var schema = new Schema({
  avatar: String,
  name: { type: String, minlength: 3, maxLength: 16 },
  password: { type: String, required: true },
  gender: { type: String, enum: ['unknown', 'secret', 'male', 'female'], default: 'secret' },
  mobile: { type: String, unique: true, validate: { validator: v => /^\d{11}$/.test(v) } },
  createAt: { type: Date, default: Date.now },
  registerAt: { type: Date, default: Date.now },
  source: {
    platform: String,
    deviceId: String
  }
});

schema.options.toJSON = {
  transform: toJSON(ret => {
    if (_.has(ret, 'password') && process.env.NODE_ENV == 'production') {
      delete ret.password;
    }

    return ret;
  })
};

module.exports = connection.model('User', schema);

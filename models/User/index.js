const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const matchMobile = reqlib('./utils/schema/match/mobile');
const connection = reqlib('./utils/mongodb-connection');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema, Types } = mongoose;
const { GENDERS } = require('./genders');

const schema = new Schema({
  name: { type: String, default: '' },
  password: { type: String, match: matchPassword, default: null },
  gender: { type: String, enum: GENDERS, default: 'secret' },
  mobile: {
    type: String,
    match: matchMobile,
    index: {
      unique: true,
      partialFilterExpression: {
        mobile: { $type: 'string' }
      }
    }
  },
  avatar: { type: String, default: null },
  thirdParty: {
    weixin: {
      openid: { type: String, default: null },
      unionid: { type: String, default: null },
      bindAt: { type: Date, default: null }
    }
  },
  createAt: { type: Date, default: Date.now },
  registerAt: { type: Date, default: Date.now }
}, { toJSON, toObject });

const User = module.exports = connection.model('User', schema);

const mongoose = require('mongoose');

const matchPassword = reqlib('./utils/schema/match/password');
const matchMobile = reqlib('./utils/schema/match/mobile');
const connection = reqlib('./utils/mongodb-connection');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema, Types } = mongoose;
const { GENDERS } = require('./genders');

const schema = new Schema({
  name: { type: String, minlength: 3, maxLength: 24, default: '' },
  password: { type: String, match: matchPassword, default: null },
  gender: { type: String, enum: GENDERS, default: 'secret' },
  mobile: { type: String, unique: true, sparse: true, match: matchMobile },
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

module.exports = connection.model('User', schema);

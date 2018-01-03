const mongoose = require('mongoose');

const genValidator = require('utils/schema/model/genValidator');
const genMiddleware = require('utils/router/genMiddleware');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  userId: { type: ObjectId, required: true },
  accessToken: { type: String, required: true },
  openid: { type: String, required: true },
  unionid: { type: String, required: true }
}, { _id: false });

module.exports = genMiddleware(genValidator(schema, 'client'), 'body');

const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/transform');
const toObject = require('./toObject');
const toJSON = require('./toJSON');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;

const schema = new Schema({
  userId: { type: ObjectId, default: null },
  action: { type: String, default: null },
  method: { type: String, default: null },
  path: { type: String, default: null },
  route: { type: String, default: null },
  params: { type: Mixed, default: {} },
  query: { type: Mixed, default: {} },
  body: { type: Mixed, default: {} },
  response: { type: Mixed, default: {} },
  createAt: { type: Date, default: new Date() },
  duration: Number
}, {
  toJSON,
  toObject
});

module.exports = connection.model('UserLog', schema);

const mongoose = require('mongoose');

const connection = require('../utils/mongodb-connection');

const { Schema, Types } = mongoose;
const { Mixed, ObjectId } = Types;

const schema = new Schema({
  accountId: ObjectId,
  method: String,
  action: String,
  path: String,
  pathPattern: String,
  params: Mixed,
  query: Mixed,
  body: Mixed,
  res: Mixed
});

module.exports = connection.model('AccountLog', schema);

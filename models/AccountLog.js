const mongoose = require('mongoose');

const connection = reqlib('./utils/mongodb-connection');
const transform = reqlib('./utils/schema/transform');

const { Schema } = mongoose;
const { Mixed, ObjectId } = Schema.Types;

const schema = new Schema({
  accountId: { type: ObjectId, default: null },
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
  toJSON: {
    virtuals: true,
    minimize: false,
    transform
  },

  toObject: {
    virtuals: true,
    minimize: false,
    transform
  }
});

// 弃
schema.methods.setAccountId = function(token) {
  this.set('accountId', (token || {}).accountId);
  return token;
};

schema.methods.setRes = function(res) {
  this.set('res', res);
  return this;
};

module.exports = connection.model('AccountLog', schema);

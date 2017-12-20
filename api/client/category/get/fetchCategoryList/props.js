const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

module.exports = [
  {
    prop: 'channelId',
    shape: ObjectId
  },
  {
    prop: 'categoryId',
    shape: ObjectId,
    transTo: '_id'
  },
  {
    prop: 'name',
    search: true
  },
];

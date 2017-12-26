const mongoose = require('mongoose');

const { TYPES } = require('models/Banner/types');
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
    prop: 'type',
    enums: TYPES
  },
  {
    prop: 'title',
    search: true
  },
];

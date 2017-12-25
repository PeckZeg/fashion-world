const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

module.exports = [
  {
    prop: 'channelId',
    shape: ObjectId
  },
  {
    prop: 'categoryId',
    shape: ObjectId
  },
  {
    prop: 'title',
    search: true
  },
  {
    prop: 'recommendAt',
    cond: {
      on: () => ({ $ne: null, $lte: new Date() }),
      off: () => ({ $eq: null })
    }
  }
];

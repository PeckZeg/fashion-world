const { Types } = require('mongoose');
const { ObjectId } = Types;

module.exports = (arr, prop) => _.chain(arr)
  .map(prop)
  .invokeMap('toString')
  .compact()
  .uniq()
  .map(id => ObjectId(id))
  .value();

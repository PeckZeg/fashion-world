const { ObjectId } = require('mongoose').Types;

/**
 *  @deprecated
 */
module.exports = (id, idName = 'objectId') => new Promise((resolve, reject) => {
  if (!ObjectId.isValid(id)) {
    return reject(new ResponseError(400, `invalid ${idName}`));
  }

  resolve(ObjectId(id));
});

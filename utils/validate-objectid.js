const { ObjectId } = require('mongoose').Types;
const CaaError = reqlib('./utils/CaaError');

module.exports = id => new Promise((resolve, reject) => {
  if (!ObjectId.isValid(id)) {
    return reject(CaaError(400, 'invalid channelId'));
  }

  resolve(ObjectId(id));
});

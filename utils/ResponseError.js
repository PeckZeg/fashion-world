const util = require('util');

const ResponseError = function(status, message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = status;
  this.message = message;
};

util.inherits(ResponseError, Error);

module.exports = ResponseError;

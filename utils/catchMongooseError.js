const CaaError = require('./CaaError');

module.exports = err => {
  if (!err) return null;

  let key = _.chain(err.errors).keys().first().value();
  let error = err.errors[key];

  return CaaError(500, error ? error.message : err.message);
};

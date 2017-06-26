const catchError = err => {
  if (!err) return null;

  let key = _.chain(err.errors).keys().first().value();
  let error = key ? err.errors[key] : null;

  return new ResponseError(500, error ? error.message : err.message);
};

module.exports = (res, err) => {
  const { status, message } = catchError(err);

  res.status(status || 500).send({ message });
};

const catchError = err => {
  if (!err) return null;

  let key = _.chain(err.errors).keys().first().value();
  let error = key ? err.errors[key] : null;
  let message = (error ? error.message : err.message) || 'Internal Server Error';
  let status = (error ? error.status : err.status) || 500;

  return new ResponseError(status, message);
};

module.exports = (res, err) => {
  const { status, message } = catchError(err);

  console.error(err);

  res.status(status || 500).send({ message });
};

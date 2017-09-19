const debug = require('debug')('api');
const colors = require('colors/safe');

const catchError = err => {
  if (!err) return null;

  let key = _.chain(err.errors).keys().first().value();
  let error = key ? err.errors[key] : null;
  let message = (error ? error.message : err.message) || 'Internal Server Error';
  let status = (error ? error.status : err.status) || 500;

  if (message.includes('duplicate key error')) {
    message = 'duplicate key error';
  }

  return new ResponseError(status, message);
};

module.exports = (res, err) => {
  const { status, message } = catchError(err);

  if (err instanceof ResponseError) {
    debug(
      colors.bgRed.white(' ERROR '),
      colors.bgYellow.grey(` ${err.status} `),
      err.message
    );
  }

  else {
    console.error(err);
  }

  res.status(status || 500).send({ message });
};

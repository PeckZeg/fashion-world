const colors = require('colors/safe');
const debug = require('debug')('api');
const path = require('path');
const url = require('url');

const colorMethod = require('./colorMethod');
const iterObject = require('./iterObject');

const colorTitle = (title, object) => debug(
  '  ',
  `${colors.bold(title)}\t`,
  colors.italic.grey(`(${_.size(object)})`),
  ':',
  _.isEmpty(object) ? colors.gray('null') : ''
);

module.exports = (req, res, next) => {
  const { params, query, body } = req;
  const method = colorMethod(req);
  const { pathname } = url.parse(req.originalUrl);

  // method & pathname
  debug(method, colors.grey(pathname));

  // params
  colorTitle('params', params);
  iterObject(params);

  // query
  colorTitle('query', query);
  iterObject(query);

  // body
  colorTitle('body', body);
  iterObject(body);

  next();
};

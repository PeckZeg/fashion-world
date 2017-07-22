const url = require('url');

module.exports = pathname => pathname ?
  url.format({ ...config.ftpToHttp.resource, pathname }) :
  null;

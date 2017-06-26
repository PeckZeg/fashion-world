const url = require('url');

module.exports = pathname => pathname ? url.format({ ...config.resource, pathname }) : null;

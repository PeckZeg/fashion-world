const url = require('url');

/**
 *  @deprecated
 */
module.exports = pathname => pathname ? url.format({ ...config.resource, pathname }) : null;

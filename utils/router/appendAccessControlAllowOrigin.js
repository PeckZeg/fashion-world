const url = require('url');

module.exports = (req, res, next) => {
  const { protocol, hostname } = req;

  if (config.accessControlAllowOrigin.indexOf(hostname) > -1) {
    res.append('Access-Control-Allow-Origin', url.format({ protocol, hostname }));
  }

  next();
};

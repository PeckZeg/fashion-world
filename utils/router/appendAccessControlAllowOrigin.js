const url = require('url');

module.exports = (req, res, next) => {
  const origin = req.header('origin');

  if (origin) {
    const { hostname, protocol } = url.parse(origin);

    if (config.accessControlAllowOrigin.indexOf(hostname) > -1) {
      res.append('Access-Control-Allow-Origin', url.format({ protocol, hostname }));
      req.append('Access-Control-Allow-Methods', '*');
      req.append('Access-Control-Allow-Headers', '*');
    }
  }

  next();
};

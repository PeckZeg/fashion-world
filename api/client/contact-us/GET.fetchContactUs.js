const fs = require('fs');

const handleError = reqlib('./utils/response/handle-error');

const JSON_PATHNAME = appRootPath.resolve('./data/contact-us.json');
const OPTS = { encoding: 'utf8' };

module.exports = (req, res, next) => {
  Promise.resolve({ pathname: JSON_PATHNAME, opts: OPTS })

    // read json file
    .then(({ pathname, opts }) => new Promise((resolve, reject) => {
      fs.readFile(pathname, opts, (err, data) => {
        if (err) return reject(err);
        resolve(JSON.parse(data));
      });
    }))

    .then(result => res.send(result))
    .catch(err => handleError(res, err));
};

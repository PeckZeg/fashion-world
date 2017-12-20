const fs = require('fs');

const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');

const ACTION = config.apiActions['admin:contact:get:fetch-contact-list'];
const CONTACT_FILE_PATH = appRootPath.resolve(config.dataPath.contact);
const OPTS = { encoding: 'utf8' };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // read contact json
    .then(token => new Promise((resolve, reject) => {
      fs.readFile(CONTACT_FILE_PATH, OPTS, (err, data) => {
        !err ? resolve(JSON.parse(data)) : reject(err);
      });
    }))

    .then(contact => res.send({ contact }))
    .catch(err => handleError(res, err));
};

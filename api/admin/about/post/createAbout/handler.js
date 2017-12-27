const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const About = require('models/About');

const action = 'ADMIN_ABOUT_POST_CREATE_ABOUT';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let about = new About(req.body);

    about = (await about.save()).toObject();

    handleResult(res, { about }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

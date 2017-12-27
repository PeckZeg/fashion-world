const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const About = require('models/About');

const action = 'ADMIN_ABOUT_GET_FETCH_ABOUT_PROFILE';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { aboutId } = req.params;
    let about = await About.findById(aboutId);

    if (!about) {
      throw new ResponseError(404, 'about not found');
    }

    about = about.toObject();

    handleResult(res, { about }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

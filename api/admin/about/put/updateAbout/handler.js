const isEmpty = require('lodash/isEmpty');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const About = require('models/About');

const action = 'ADMIN_ABOUT_PUT_UPDATE_ABOUT';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { aboutId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };

    let about = await About.findByIdAndUpdate(aboutId, doc, opts);

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

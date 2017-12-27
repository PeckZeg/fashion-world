const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const About = require('models/About');

const action = 'ADMIN_ABOUT_DEL_BLOCK_ABOUT';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { aboutId } = req.params;
    let about = await About.findById(aboutId, 'publishAt');

    if (!about) {
      throw new ResponseError(404, 'about not found');
    }

    if (!about.publishAt) {
      throw new ResponseError(403, 'about has been blocked');
    }

    const doc = { $set: { publishAt: null } };
    const opts = { new: true };

    about = await About.findByIdAndUpdate(aboutId, doc, opts);
    about = about.toObject();

    handleResult(res, { about }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

const isEmpty = require('lodash/isEmpty');

const handleResult = require('utils/response/handleResult');
const injectBanner = require('utils/models/inject/banner');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_PUT_UPDATE_BANNER';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { bannerId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };
    const banner = await injectBanner(
      await Banner.findByIdAndUpdate(bannerId, doc, opts),
      { handler: 'toObject' }
    );

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

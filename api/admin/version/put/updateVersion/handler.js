const isEmpty = require('lodash/isEmpty');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Version = require('models/Version');

const action = 'ADMIN_VERSION_PUT_UPDATE_VERSION';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { versionId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };
    let version = await Version.findByIdAndUpdate(versionId, doc, opts);

    if (!version) {
      throw new ResponseError(404, 'version not found');
    }

    version = version.toObject();

    handleResult(res, { version }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

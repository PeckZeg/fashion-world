const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Version = require('models/Version');

const action = 'ADMIN_VERSION_GET_FETCH_VERSION_PROFILE';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let version = await Version.findById(req.params.versionId);

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

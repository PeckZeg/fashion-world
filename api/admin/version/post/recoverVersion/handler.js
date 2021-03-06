const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Version = require('models/Version');

const action = 'ADMIN_VERSION_POST_RECOVER_VERSION';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { versionId } = req.params;
    let version = await Version.findById(versionId, 'removeAt');

    if (!version) {
      throw new ResponseError(404, 'version not found');
    }

    if (!version.removeAt) {
      throw new ResponseError(403, 'version has been recovered');
    }

    const doc = { $set: { removeAt: new Date() } };
    const opts = { new: true };

    version = await Banner.findByIdAndUpdate(versionId, doc, opts);
    version = version.toObject();

    handleResult(res, { version }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

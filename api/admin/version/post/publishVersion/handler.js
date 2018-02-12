const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Version = require('models/Version');

const action = 'ADMIN_VERSION_POST_PUBLISH_VERSION';

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { versionId } = req.params;
    let version = await Version.findById(versionId, 'publishAt');

    if (!version) {
      throw new ResponseError(404, 'version not found');
    }

    if (version.publishAt) {
      throw new ResponseError(403, 'version has been published');
    }

    const { publishAt = new Date() } = req.body;
    const doc = { $set: { publishAt, removeAt: null } };
    const opts = { new: true };

    version = await Version.findByIdAndUpdate(bannerId, doc, opts);
    version = version.toObject();

    handleResult(res, { version }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

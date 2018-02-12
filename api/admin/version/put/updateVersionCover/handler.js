const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Version = require('models/Version');

const action = 'ADMIN_VERSION_PUT_UPDATE_VERSION_COVER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { versionId } = req.params;
    const { key } = req.body;

    if (key === void 0) {
      throw new ResponseError(400, 'invalid key');
    }

    let version = await Version.findById(versionId);

    if (!version) {
      throw new ResponseError(404, 'version not found');
    }

    let cover = null;

    if (key) {
      const bucketManager = createBucketManager();
      const { mimeType } = await fetchStat(bucketManager, bucket, key);
      const extname = mimeExt(mimeType);
      const sha1 = await fetchFileSha1(key);
      cover = `${sha1}${extname}`;

      await bucketManager.moveAsync(bucket, key, bucket, cover, { force: true });
    }

    const doc = { $set: { cover } };
    const opts = { new: true };

    version = await Version.findByIdAndUpdate(versionId, doc, opts);
    version = version.toObject();

    handleResult(res, { version }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

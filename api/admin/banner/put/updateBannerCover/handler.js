const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectBanner = require('utils/models/inject/banner');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_PUT_UPDATE_BANNER_COVER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { bannerId } = req.params;
    const { key } = req.body;

    if (key === void 0) {
      throw new ResponseError(400, 'invalid key');
    }

    let banner = await Banner.findById(bannerId);

    if (!banner) {
      throw new ResponseError(404, 'banner not found');
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

    banner = await injectBanner(
      await Banner.findByIdAndUpdate(bannerId, doc, opts),
      { handler: 'toObject' }
    );

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

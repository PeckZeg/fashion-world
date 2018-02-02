const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const injectBanner = require('utils/models/inject/banner');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');
const mimeExt = require('utils/mimeExt');

const Banner = require('models/Banner');

const action = 'ADMIN_BANNER_POST_CREATE_BANNER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async function(req, res, next) {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { key, ...bannerParams } = req.body;
    let cover = null;

    if (key) {
      const bucketManager = createBucketManager();
      const { mimeType } = await fetchStat(bucketManager, bucket, key);
      const extname = mimeExt(mimeType);
      const sha1 = await fetchFileSha1(key);
      cover = `${sha1}${extname}`;

      await bucketManager.moveAsync(bucket, key, bucket, cover, { force: true });
    }

    let banner = new Banner({ ...bannerParams, cover });
    banner = await injectBanner(await banner.save(), { handler: 'toObject' });

    handleResult(res, { banner }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

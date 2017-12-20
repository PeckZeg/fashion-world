const injectCategory = require('utils/models/inject/category');
const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Category = require('models/Category');

const action = 'ADMIN_CATEGORY_PUT_UPDATE_CATEGORY_COVER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { categoryId } = req.params;
    const { key } = req.body;
    let category = await Category.findById(categoryId);

    if (!category) {
      throw new ResponseError(404, 'category not found');
    }

    const bucketManager = createBucketManager();
    const { mimeType } = await fetchStat(bucketManager, bucket, key);
    const extname = mimeExt(mimeType);
    const sha1 = await fetchFileSha1(key);
    const cover = `${sha1}${extname}`;

    await bucketManager.moveAsync(bucket, key, bucket, cover, { force: true });

    const doc = { $set: { cover } };
    const opts = { new: true };

    category = await Category.findByIdAndUpdate(categoryId, doc, opts);
    category = await injectCategory(category, { handler: 'toObject' });

    handleResult(res, { category }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

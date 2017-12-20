const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Account = require('models/Account');

const action = 'ADMIN_ACCOUNT_PUT_UPDATE_ACCOUNT_AVATAR';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { key } = req.body;
    const { accountId } = req.params;
    let account = await Account.findById(accountId);

    if (!account) {
      throw new ResponseError(404, 'account not found');
    }

    const bucketManager = createBucketManager();
    const { mimeType } = await fetchStat(bucketManager, bucket, key);
    const extname = mimeExt(mimeType);
    const sha1 = await fetchFileSha1(key);
    const avatar = `${sha1}${extname}`;

    await bucketManager.moveAsync(bucket, key, bucket, avatar, {
      force: true
    });

    const doc = { $set: { avatar } };
    const opts = { new: true };

    account = await Account.findByIdAndUpdate(accountId, doc, opts);
    account = account.toObject();

    handleResult(res, { account }, log);
  }

  catch(err) {
    handleError(res, err);
  }
};

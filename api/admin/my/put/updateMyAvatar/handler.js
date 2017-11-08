const createBucketManager = require('utils/qiniu/createBucketManager');
const handleResult = require('utils/response/handleResult');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const fetchStat = require('utils/qiniu/fetchStat');
const mimeExt = require('utils/mimeExt');

const Account = require('models/Account');

const ACTION = 'ADMIN_MY_UPDATE_MY_AVATAR';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const { avatar: key } = req.body;
    const log = createLog(req, ACTION);
    const token = await authToken(req, ACTION, { log });
    const { accountId } = token;
    let account = await Account.findById(accountId);

    if (!account) {
      throw new ResponseError(404, 'account not found');
    }

    const bucketManager = createBucketManager();
    const { mimeType } = await fetchStat(bucketManager, bucket, key);
    const extname = mimeExt(mimeType);
    const sha1 = await fetchFileSha1(key);
    const avatar = `account/${accountId}/${sha1}${extname}`;

    // rename bucket key
    await bucketManager.moveAsync(bucket, key, bucket, avatar, { force: true });

    // update account
    account = await Account.findByIdAndUpdate(accountId, {
      $set: { avatar }
    }, { new: true });

    account = account.toObject();

    handleResult(res, { account }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

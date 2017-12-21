const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const User = require('models/User');

const action = 'ADMIN_USER_PUT_UPDATE_USER_AVATAR';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { userId } = req.params;
    let user = await User.findById(userId);

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    const { key } = req.body;
    let avatar = null;

    if (key) {
      const bucketManager = createBucketManager();
      const { mimeType } = await fetchStat(bucketManager, bucket, key);
      const extname = mimeExt(mimeType);
      const sha1 = await fetchFileSha1(key);
      avatar = `${sha1}${extname}`;

      await bucketManager.moveAsync(bucket, key, bucket, avatar, { force: true });
    }

    const doc = { $set: { avatar } };
    const opts = { new: true };

    user = await User.findByIdAndUpdate(userId, doc, opts);
    user = user.toObject();

    handleResult(res, { user }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

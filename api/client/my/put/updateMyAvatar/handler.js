const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const handleError = require('utils/response/handleError');
const authToken = require('utils/token/auth/user');
const fetchStat = require('utils/qiniu/fetchStat');
const mimeExt = require('utils/mimeExt');

const User = require('models/User');

const ACTION = 'CLIENT_MY_PUT_UPLOAD_MY_AVATAR';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const { avatar: key } = req.body;
    const token = await authToken(req, ACTION, { required: true });
    const { userId } = token;
    let user = await User.findById(userId);

    if (!user) {
      throw new ResponseError(404, 'user not found');
    }

    const bucketManager = createBucketManager();
    const { mimeType } = await fetchStat(bucketManager, bucket, key);
    const extname = mimeExt(mimeType);
    const sha1 = await fetchFileSha1(key);
    const avatar = `user/${userId}/${sha1}${extname}`;

    // rename buck key
    await bucketManager.moveAsync(bucket, key, bucket, avatar, { force: true });

    // update user
    const doc = { $set: { avatar } };
    const opts = { new: true };

    user = await User.findByIdAndUpdate(userId, doc, opts);
    user = user.toJSON();

    res.send({ user });
  }

  catch (err) {
    handleError(res, err);
  }
};

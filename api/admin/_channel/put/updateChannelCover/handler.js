const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');
const mimeExt = require('utils/mimeExt');

const createBucketManager = require('utils/qiniu/createBucketManager');
const fetchFileSha1 = require('utils/qiniu/fetchFileSha1');
const fetchStat = require('utils/qiniu/fetchStat');

const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_PUT_UPDATE_CHANNEL_COVER';
const { images: bucket } = config.qiniu.bucket;

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { channelId } = req.params;
    const { key } = req.body;
    let channel = await Channel.findById(channelId);

    if (!channel) {
      throw new ResponseError(404, 'channel not found');
    }

    const bucketManager = createBucketManager();
    const { mimeType } = await fetchStat(bucketManager, bucket, key);
    const extname = mimeExt(mimeType);
    const sha1 = await fetchFileSha1(key);
    const cover = `${sha1}${extname}`;

    await bucketManager.moveAsync(bucket, key, bucket, cover, { force: true });

    const doc = { $set: { cover } };
    const opts = { new: true };

    channel = await Channel.findByIdAndUpdate(channelId, doc, opts);
    channel = channel.toObject();

    handleResult(res, { channel }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

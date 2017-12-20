const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');
const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_DEL_BLOCK_CHANNEL';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { channelId } = req.params;
    let channel = await Channel.findById(channelId, 'publishAt');

    if (!channel) {
      throw new ResponseError(404, 'channel not found');
    }

    if (!channel.publishAt) {
      throw new ResponseError(403, 'channel has been blocked');
    }

    const doc = { $set: { publishAt: null } };
    const opts = { new: true };

    channel = await Channel.findByIdAndUpdate(channelId, doc, opts);
    channel = channel.toObject();

    handleResult(res, { channel }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

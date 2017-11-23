const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');
const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_DEL_DESTROY_CHANNEL';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { channelId } = req.params;
    let channel = await Channel.findById(channelId, 'removeAt');

    if (!channel) {
      throw new ResponseError(404, 'channel not found');
    }

    if (channel.removeAt) {
      throw new ResponseError(403, 'channel has been removed');
    }

    const doc = { $set: { publishAt: null, removeAt: new Date() } };
    const opts = { new: true };

    channel = await Channel.findByIdAndUpdate(channelId, doc, opts);
    channel = channel.toObject();

    handleResult(res, { channel }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

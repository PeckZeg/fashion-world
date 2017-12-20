const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');
const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_GET_FETCH_CHANNEL_PROFILE';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { channelId } = req.params;
    let channel = await Channel.findById(channelId);

    if (!channel) {
      throw new ResponseError(404, 'channel not found');
    }

    channel = channel.toObject();

    handleResult(res, { channel }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

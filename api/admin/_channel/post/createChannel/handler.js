const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_POST_CREATE_CHANNEL';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    let channel = new Channel(req.body);

    channel = await channel.save();
    channel = channel.toObject();

    handleResult(res, { channel }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

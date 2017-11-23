const isEmpty = require('lodash/isEmpty');

const handleResult = require('utils/response/handleResult');
const handleError = require('utils/response/handle-error');
const authToken = require('utils/token/auth/account');
const createLog = require('utils/createAccountLog');

const Category = require('models/Category');
const Channel = require('models/Channel');

const action = 'ADMIN_CHANNEL_PUT_UPDATE_CHANNEL';

module.exports = async (req, res, next) => {
  try {
    const log = createLog(req, action);
    const token = await authToken(req, action, { log });
    const { channelId } = req.params;

    if (isEmpty(req.body)) {
      throw new ResponseError(400, 'request body is empty');
    }

    const doc = { $set: req.body };
    const opts = { new: true };
    let channel = await Channel.findByIdAndUpdate(channelId, doc, opts);

    channel = channel.toObject();

    handleResult(res, { channel }, log);
  }

  catch (err) {
    handleError(res, err);
  }
};

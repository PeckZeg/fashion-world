const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');
const validateBody = require('./validateBody');

const Channel = reqlib('./models/Channel');

const ACTION = 'ADMIN_CHANNEL_PUT_UPDATE_CHANNEL';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `channelId`
    .then(token => validateObjectId(req.params.channelId))

    // validate body
    .then(channelId => (
      validateBody(req.body).then(body => ({ channelId, body }))
    ))

    // update channel doc
    .then(({ channelId, body }) => (
      Channel.findByIdAndUpdate(channelId, { $set: body }, { new: true })
    ))

    // transform channel doc
    .then(channel => {
      if (!channel) {
        return Promise.reject(new ResponseError(404, 'channel not found'));
      }

      return channel.toObject();
    })

    .then(channel => handleResult(res, { channel }, log))
    .catch(err => handleError(res, err));
};

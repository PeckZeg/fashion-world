const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');

const Channel = reqlib('./models/Channel');

const ACTION = 'ADMIN_CHANNEL_GET_FETCH_CHANNEL_PROFILE';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `channelId`
    .then(token => validateObjectId(req.params.channelId))

    // query channel doc
    .then(channelId => Channel.findById(channelId))

    // ensure channel doc
    .then(channel => {
      if (!channel) {
        return Promise.reject(
          new ResponseError(404, 'channel not found')
        );
      }

      return channel.toObject();
    })

    .then(channel => handleResult(res, { channel }, log))
    .catch(err => handleError(res, err));
};

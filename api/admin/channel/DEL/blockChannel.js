const handleResult = reqlib('./utils/response/handleResult');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/token/auth/account');
const createLog = reqlib('./utils/createAccountLog');

const validateObjectId = reqlib('./utils/validate-objectid');

const Channel = reqlib('./models/Channel');

const ACTION = 'ADMIN_CHANNEL_DEL_BLOCK_CHANNEL';

module.exports = (req, res, next) => {
  const log = createLog(req, ACTION);

  authToken(req, ACTION, { log })

    // validate `channelId`
    .then(token => validateObjectId(req.params.channelId))

    // query channel doc
    .then(channelId => Channel.findById(channelId, 'publishAt'))

    // ensure channel exists
    .then(channel => {
      if (!channel) {
        return Promise.reject(
          new ResponseError(404, 'channel not found')
        );
      }

      if (!channel.publishAt) {
        return Promise.reject(
          new ResponseError(403, 'channel has been blocked')
        );
      }

      const doc = {
        $set: {
          publishAt: null
        }
      };

      return Channel.findByIdAndUpdate(channel._id, doc, { new: true });
    })

    // inject props
    .then(channel => channel.toObject())

    .then(channel => handleResult(res, { channel }, log))
    .catch(err => handleError(res, err));
};

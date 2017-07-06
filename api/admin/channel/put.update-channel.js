const validateParams = reqlib('./validate-models/admin/channel/update-channel-body-params');
const handleError = reqlib('./utils/response/handle-error');
const authToken = reqlib('./utils/keys/account/auth-token');
const transformQuery = reqlib('./utils/transform-query');
const validateObjectId = reqlib('./utils/validate-objectid');

const Channel = reqlib('./models/Channel');

const ACTION = config.apiActions['admin:channel:put:update-channel'];
const OPTS = { new: true };

module.exports = (req, res, next) => {
  authToken(ACTION, req.header('authorization'))

    // validate `channelId`
    .then(keys => validateObjectId(req.params.channelId))

    // validate body params
    .then(channelId => (
      validateParams(req.body).then(body => ({ channelId, body }))
    ))

    // update channel
    .then(({ channelId, body }) => {
      const update = { $set: body };

      return Channel.findByIdAndUpdate(channelId, update, OPTS);
    })

    // send channel
    .then(channel => {
      if (!channel) {
        return Promise.reject(new ResponseError(404, 'channel not found'));
      }

      res.send({ channel: channel.toObject() });
    })

    .catch(err => handleError(res, err));
};

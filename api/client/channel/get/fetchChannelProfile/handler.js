const handleError = require('utils/response/handle-error');

const Channel = require('models/Channel');

module.exports = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);

    if (!channel || !channel.publishAt || channel.removeAt) {
      throw new ResponseError(404, 'channel not found');
    }

    res.send({ channel: channel.toJSON() });
  }

  catch (err) {
    handleError(res, err);
  }
};

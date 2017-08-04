const mapObjectIds = reqlib('./utils/map-objectids');

const Channel = reqlib('./models/Channel');

module.exports = (banners, handler = 'toJSON') => Promise.resolve(banners)

  // fetch `_id` from banners
  .then(banners => ({
    banners,
    _id: mapObjectIds(banners, 'channelId')
  }))

  // fetch channel docs
  .then(({ banners, _id }) => (
    Channel.find({ _id }).then(channels => ({
      banners,
      channels: _.keyBy(channels, '_id')
    }))
  ))

  // inject channels
  .then(({ banners, channels }) => banners.map(banner => {
    const { channelId } = banner;
    const model = channels[channelId];
    const channel = model ? model[handler]() : null;

    return { ...banner, channel };
  }));

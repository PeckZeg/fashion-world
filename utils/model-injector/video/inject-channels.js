const mapObjectIds = reqlib('./utils/map-objectids');

const Channel = reqlib('./models/Channel');

module.exports = (videos, handlerName = 'toJSON') => Promise.resolve(videos)

  // map channelId
  .then(videos => ({
    videos,
    _id: mapObjectIds(videos, 'channelId')
  }))

  // query channel docs
  .then(({ videos, _id }) => (
    Channel.find({ _id }).then(channels => ({
      videos,
      channels: _.keyBy(channels, '_id')
    }))
  ))

  // inject `channel` to videos
  .then(({ videos, channels }) => videos.map(video => {
    const model = channels[video.channelId];
    const channel = model ? model[handlerName]() : null;

    return { ...video, channel };
  }));

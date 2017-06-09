const VideoChannel = reqlib('./models/VideoChannel');
const mapObjectIds = reqlib('./utils/map-objectids');
const handleError = reqlib('./utils/catchMongooseError');

module.exports = videos => Promise.resolve(
  Array.isArray(videos) ? videos : [videos]
)

  // map channelId list
  .then(videos => ({ videos, channelIds: mapObjectIds(videos, 'channelId') }))

  // fetch channel docs
  .then(({ videos, channelIds }) => new Promise((resolve, reject) => {
    VideoChannel.find({ _id: channelIds })
      .then(channels => resolve({ videos, channels }))
      .catch(err => reject(handleError(err)));
  }))

  // group by channel id
  .then(({ videos, channels }) => ({ videos, channels: _.keyBy(channels, '_id') }))

  // inject `channel` to videos
  .then(({ videos, channels }) => videos.map(video => {
    const model = channels[video.channelId];
    const channel = model ? model.toJSON() : null;

    return { ...video, channel };
  }));

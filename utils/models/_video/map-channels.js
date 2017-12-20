const VideoChannel = reqlib('./models/VideoChannel');
const mapObjectIds = reqlib('./utils/map-objectids');

module.exports = videos => Promise.resolve(videos)

  // init videos
  .then(videos => Array.isArray(videos) ? videos : [videos])

  // map channelId list
  .then(videos => ({
    videos,
    _id: mapObjectIds(videos, 'channelId')
  }))

  // fetch channel docs
  .then(({ videos, _id }) => (
    VideoChannel.find({ _id }).then(channels => ({
      videos,
      channels: _.keyBy(channels, '_id')
    }))
  ))

  // inject `channel` to videos
  .then(({ videos, channels }) => videos.map(video => {
    const model = channels[video.channelId];
    const channel = model ? model.toJSON() : null;

    return { ...video, channel };
  }));

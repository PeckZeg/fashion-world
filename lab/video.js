const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');
const _ = require('lodash');
const SRC = '/tmp/伦敦时装周秋冬M17-18-COTTWEILER.mp4';

ffmpeg(SRC).ffprobe((err, metadata) => {
  if (err) return console.error(err);

  let videoMetadata = metadata.streams.filter(stream => stream.codec_type == 'video');

  if (videoMetadata.length) {
    let { width, height, duration } = videoMetadata[0];
    duration = moment.duration(duration, 's');

    let d = `${duration.minutes()}:${duration.seconds()}`;

    duration = +duration;
    console.dir({ width, height, duration, d })
  }

  // console.dir(metadata.streams.filter(stream => stream.codec_type == 'video'));
});

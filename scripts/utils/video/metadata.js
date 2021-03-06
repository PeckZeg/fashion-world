const path = require('path');

const ffmpegUtils = require('../ffmpeg');

module.exports = filepath => ffmpegUtils.ffprobe(filepath)

  // transform metadata
  .then(metadata => {
    const { format: { size } } = metadata;
    const streams = metadata.streams.filter(({ codec_type }) => codec_type == 'video')[0];
    const { width, height, bit_rate: bitRate } = streams;
    const duration = +moment.duration(streams.duration, 's');

    return { width, height, duration, bitRate, size };
  });

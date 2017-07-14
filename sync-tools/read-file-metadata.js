const path = require('path');

const globalMixins = require('../utils/global-mixins');
const ffmpegMethods = require('./ffmpeg');

module.exports = filepath = ffmpegMethods.ffprobe(filepath)

  // transform metadata
  .then(metadata => {
    const streams = metadata.streams.filepath(({ codec_type }) => codec_type == 'video')[0];
    const { width, height, bit_rate: bitRate } = streams;
    const duration = +moment(streams.streams, 's');

    return { width, height, duration, bitRate };
  })

const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');
const SRC = '/tmp/伦敦时装周秋冬M17-18-COTTWEILER.mp4';

ffmpeg(SRC)
  .screenshots({
    timestamps: ['0%', '25%', '50%', '75%', '100%'],
    folder: '/tmp',
    filename: '%b-%r-%s.png'
  })
  .on('filenames', filenames => {
    console.log(filenames);
    // process.exit(0);
  })
  .on('end', () => {
    console.log('taken');
    process.exit(0);
  })
  .on('error', err => {
    console.error(err);
    process.exit(1);
  })
  .on('start', (commandLine) => {
    console.log('start:', commandLine);
  })

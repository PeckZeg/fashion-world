const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');

const globalMixins = require('../utils/global-mixins');
const syncUtils = require('./utils');
const handleSingleVideo = require('./handle-single-video');

const TEST_FILE_PATH = path.join('/tmp', '短片2017-Sexy-AlexandrePeccin-FrancielePerao.mp4');

handleSingleVideo(TEST_FILE_PATH)

  .then(result => new Promise((resolve, reject) => {
    const destpath = path.join('/tmp', `${uuid()}.json`);
    const data = JSON.stringify(result, null, 2);

    fs.writeFile(destpath, data, err => {
      if (err) return reject(err);
      resolve(destpath);
    });
  }))

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

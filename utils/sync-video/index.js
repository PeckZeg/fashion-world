const Client = require('ftp');
const path = require('path');
const fetchVideoList = require('./fetch-video-list');
const loadVideoMetadata = require('./load-video-metadata');
const config = require('../../config');
const FOLDER = config.ftpServer.folder;

let client = new Client();

fetchVideoList(client)
  .then(list => list.filter(v => v.name.endsWith('mp4')).slice(0, 1))
  .then(list => loadVideoMetadata(client, list))
  .then(results => {
    console.log({results});
    process.exit(0);
  })
  .catch(err => {
    console.error({err});
    process.exit(1);
  });

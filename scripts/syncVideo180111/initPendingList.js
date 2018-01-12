const debug = require('debug')('sync');
const path = require('path');

const endsWith = require('lodash/endsWith');
const includes = require('lodash/includes');
const compact = require('lodash/compact');
const without = require('lodash/without');
const filter = require('lodash/filter');
const uniq = require('lodash/uniq');
const map = require('lodash/map');

const createClient = require('redis/createClient');
const listFtpFiles = require('../utils/ftp/list');

const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');
const { sync: connect } = config.ftpServer;
const SYNC_FOLDERS = [
  // '/',
  '/FashionOne_New_30'
];

module.exports = async function() {
  const client = createClient();
  let mp4Files = [];
  let ssaFiles = [];

  for (const folder of SYNC_FOLDERS) {
    const files = map(await listFtpFiles(folder, { connect }), 'name');

    mp4Files = [
      ...mp4Files,
      ...map(
        filter(files, name => endsWith(name, '.mp4')),
        name => path.join(folder, name)
      )
    ];

    ssaFiles = [
      ...ssaFiles,
      ...map(
        filter(files, name => endsWith(name, '.ssa')),
        name => path.join(folder, name)
      )
    ];
  }

  mp4Files = compact(uniq(mp4Files));
  ssaFiles = compact(uniq(ssaFiles));

  for (const filename of mp4Files) {
    if (await Video.count({ filename: path.basename(filename) })) {
      without(mp4Files, filename);
    }
  }

  for (const filename of await client.smembersAsync(COMPLETE_LIST)) {
    without(mp4Files, filename);
  }

  for (const filename of await client.smembersAsync(ERROR_LIST)) {
    if (!includes(mp4Files, filename)) {
      mp4Files.push(filename);
    }
  }

  if (mp4Files.length) {
    await client.saddAsync(PENDING_LIST, ...mp4Files);
  }

  const total =  await client.scardAsync(PENDING_LIST);

  await client.delAsync(ERROR_LIST);
  await client.quitAsync();

  return { total, ssaFiles };
};

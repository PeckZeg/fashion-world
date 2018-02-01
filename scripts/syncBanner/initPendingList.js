const debug = require('debug')('sync');
const glob = require('glob');
const path = require('path');

const includes = require('lodash/includes');
const without = require('lodash/without');
const map = require('lodash/map');

const createClient = require('redis/createClient');

const Category = require('models/Category');
const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');
const DATA_DIR = path.join(__dirname, 'data');

module.exports = async function() {
  const client = createClient();
  let files = [];

  for (const channelDir of glob.sync('*/', { cwd: DATA_DIR })) {
    const channelId = channelDir.replace(/\/$/, '');

    for (const filename of glob.sync('*', { cwd: path.join(DATA_DIR, channelDir) })) {
      const basename = path.basename(filename, path.extname(filename));
      const match = basename.match(/^\[([^\]]+)\](.+)$/);

      if (match) {
        const file = path.join(DATA_DIR, channelDir, filename);
        const [name, title] = match.slice(1);
        const category = await Category.findOne({ channelId, name });
        const categoryId = category ? category._id : null;
        const video = await Video.findOne({ title });
        const videoId = video ? video._id : null;

        files.push(JSON.stringify({
          file,
          title,
          channelId,
          categoryId,
          videoId
        }));
      }
    }
  }

  files = without(files, ...(await client.smembersAsync(COMPLETE_LIST)));

  for (const conf of await client.smembersAsync(ERROR_LIST)) {
    if (!includes(files, conf)) {
      files.push(conf);
    }
  }

  if (files.length) {
    await client.saddAsync(PENDING_LIST, ...files);
  }

  const total = await client.scardAsync(PENDING_LIST);

  await client.delAsync(ERROR_LIST);
  await client.quitAsync();

  return total;
};

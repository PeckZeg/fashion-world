require('../../utils/global-mixins');

const debug = require('debug')('sync');

const createClient = require('redis/createClient');

const Category = require('models/Category');
const Channel = require('models/Channel');

const { ObjectId } = require('mongoose').Types;
const data = require('./data.json');
const opts = { new: true, upsert: true, setDefaultsOnInsert: true };

(async function() {
  try {

    debug(`🐧  需要同步 ${data.length} 个频道`);

    for (const channelData of data) {
      const { _id, name, categories } = channelData;

      if (await Channel.count({ _id })) {
        debug(`忽略频道 ${name}（原因：已存在）`);
      }

      else {
        debug(`正在同步频道 ${name}`);
        await (new Channel({ _id, name })).save();
        debug(`💠  成功同步频道 ${name}`);
      }

      if (categories && categories.length) {
        debug(`  🐧  需要同步 ${categories.length} 个分类`);

        for (const categoryName of categories) {
          if (await Category.count({ name: categoryName })) {
            debug(`  忽略分类 ${categoryName}（原因：已存在）`);
          }

          else {
            debug(`  正在同步分类 ${categoryName}`);
            await (new Category({ channelId: _id, name: categoryName })).save();
            debug(`  💠  成功同步分类 ${categoryName}`);
          }
        }
      }
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

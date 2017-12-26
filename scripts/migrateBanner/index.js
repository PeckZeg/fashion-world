require('../../utils/global-mixins');

const includes = require('lodash/includes');
const isEmpty = require('lodash/isEmpty');
const repeat = require('lodash/repeat');
const assign = require('lodash/assign');

const debug = require('debug')('migrate');

const createClient = require('redis/createClient');

const migrateImage = require('scripts/migrateVideo2/migrateImage');
const initPendingList = require('./initPendingList');
const transType = require('./transType');

const Banner = require('models/Banner');

const { TYPES } = require('models/Banner/types');
const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async () => {
  try {
    const client = createClient();
    const space = repeat(' ', 2);

    const pendingTotal = await initPendingList();
    const total = await Banner.count();

    if (pendingTotal) {
      let id;

      debug(`🐧${space}需要迁移 ${pendingTotal} 个横幅栏（总共 ${total} 个）`);

      while (id = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, id)) {
            debug(`忽略横幅栏 ${id}（原因：已迁移）`);
            continue;
          }

          debug(`正在迁移横幅栏 ${id}`);
          let banner = await Banner.findById(id);
          let doc = {};

          if (banner.cover && /^\/static/.test(banner.cover)) {
            debug(`${space}正在迁移封面`);
            assign(
              doc.$set = doc.$set || {},
              { cover: await migrateImage(banner.cover) }
            );
            debug(`${space}完成迁移封面`);
          }

          if (!includes(TYPES, banner.type)) {
            debug(`${space}正在转换类型`);
            assign(
              doc.$set = doc.$set || {},
              { type: transType(banner.type) }
            );
            debug(`${space}完成转换类型`);
          }

          if (!isEmpty(doc)) {
            debug(`${space}正在更新文档`);
            await Banner.findByIdAndUpdate(id, doc);
            debug(`${space}完成更新文档`);
          }

          await client.saddAsync(COMPLETE_LIST, id);
          debug(`🌀${space}迁移横幅栏 ${id} 成功`);
        }

        catch (err) {
          console.error(err);
          await client.saddAsync(ERROR_LIST, id);
          debug(`💊${space}迁移横幅栏 ${id} 失败`);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩${space}已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }

    else {
      debug(`👾${space}没有需要迁移的横幅栏`);
    }

    await client.quitAsync();
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

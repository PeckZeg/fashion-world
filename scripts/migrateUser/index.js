require('../../utils/global-mixins');

const repeat = require('lodash/repeat');

const debug = require('debug')('migrate');

const createClient = require('redis/createClient');

const migrateImage = require('scripts/migrateVideo2/migrateImage');
const initPendingList = require('./initPendingList');

const User = require('models/User');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async () => {
  try {
    const client = createClient();
    const space = repeat(' ', 2);

    const pendingTotal = await initPendingList();
    const total = await User.count();

    if (pendingTotal) {
      let id;

      debug(`🐧${space}需要迁移 ${pendingTotal} 个用户（共 ${total} 个用户）`);

      while (id = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, id)) {
            debug(`忽略用户 ${id}（原因：已迁移）`);
            continue;
          }

          debug(`正在迁移用户 ${id}`);

          let user = await User.findById(id);

          debug(`${space}正在迁移头像`);
          const avatar = await migrateImage(user.avatar);
          debug(`${space}完成迁移头像`);

          debug(`${space}正在更新文档`);
          const doc = {
            $set: {
              avatar
            }
          };
          await User.findByIdAndUpdate(id, doc);
          debug(`${space}完成更新文档`);

          await client.saddAsync(COMPLETE_LIST, id);
          debug(`🌀${space}迁移用户 ${id} 成功`);
        }

        catch (err) {
          console.error(err);
          await client.saddAsync(ERROR_LIST, id);
          debug(`💊${space}迁移用户 ${id} 失败`);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩${space}已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }

    else {
      debug('没有需要迁移的用户');
    }

    await client.quitAsync();
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

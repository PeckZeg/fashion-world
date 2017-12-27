require('../../utils/global-mixins');

const isEmpty = require('lodash/isEmpty');
const repeat = require('lodash/repeat');
const assign = require('lodash/assign');

const debug = require('debug')('migrate');

const createClient = require('redis/createClient');

const migrateImage = require('scripts/migrateVideo2/migrateImage');
const initPendingList = require('./initPendingList');

const LoopVideo = require('models/LoopVideo');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async function() {
  try {
    const client = createClient();
    const space = repeat(' ', 2);

    const pendingTotal = await initPendingList();
    const total = await LoopVideo.count();

    if (pendingTotal) {
      let id;

      debug(`🐧${space}需要迁移 ${pendingTotal} 个循环视频（共 ${total} 个循环视频）`);

      while (id = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, id)) {
            debug(`忽略循环视频 ${id}（原因：已迁移）`);
            continue;
          }

          debug(`正在迁移循环视频 ${id}`);

          let loopVideo = await LoopVideo.findById(id);
          let doc = {};

          if (loopVideo.cover && /^\/static/.test(loopVideo.cover)) {
            debug(`${space}正在迁移封面`);
            assign(
              doc.$set = doc.$set || {},
              { cover: await migrateImage(loopVideo.cover) }
            );
            debug(`${space}完成迁移封面`);
          }

          if (!isEmpty(doc)) {
            debug(`${space}正在更新文档`);
            await LoopVideo.findByIdAndUpdate(id, doc);
            debug(`${space}完成更新文档`);
          }

          await client.saddAsync(COMPLETE_LIST, id);
          debug(`🌀${space}迁移循环视频 ${id} 成功`);
        }

        catch (err) {
          console.error(err);
          await client.saddAsync(ERROR_LIST, id);
          debug(`💊${space}迁移循环视频 ${id} 失败`);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩${space}已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }

    else {
      debug('没有需要迁移的循环视频');
    }

    await client.quitAsync();
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

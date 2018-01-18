require('../../utils/global-mixins');

const isEmpty = require('lodash/isEmpty');
const assign = require('lodash/assign');

const debug = require('debug')('fix');

const createClient = require('redis/createClient');

const migrateImage = require('scripts/migrateVideo2/migrateImage');
const initPendingList = require('./initPendingList');

const LoopVideo = require('models/LoopVideo');
const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async function() {
  try {
    const client = createClient();
    const pendingTotal = await initPendingList();
    const total = await LoopVideo.count();

    if (pendingTotal) {
      debug(`🐧  需要修正 ${pendingTotal} 个循环视频（共 ${total} 个循环视频）`);

      let id;

      while (id = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, id)) {
            debug(`🧟‍  忽略循环视频 ${id} ，原因：修正`);
            continue;
          }

          const doc = {
            $set: {
              videoId: (await Video.aggregate().sample(1))[0]._id
            }
          };

          debug(`正在修正循环视频 ${id}`);

          await LoopVideo.findByIdAndUpdate(id, doc, { new: true });
          await client.saddAsync(COMPLETE_LIST, id);
          debug(`🗿  修正循环视频 ${id} 成功`);
        }

        catch (err) {
          await client.saddAsync(ERROR_LIST, id);
          debug(`🤢  修正 ${id} 失败`);
          console.error(err);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩  已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }
    
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

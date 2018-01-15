require('../../utils/global-mixins');

const debug = require('debug')('sync');
const mongoose = require('mongoose');
const path = require('path');

const repeat = require('lodash/repeat');
const sample = require('lodash/sample');

const createClient = require('redis/createClient');

const initCoverList = require('./initCoverList');
const initPendingList = require('./initPendingList');
// const migrateVideo = require('./migrateVideo');

const LoopVideo = require('models/LoopVideo');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async function() {
  try {
    const client = createClient();
    const pendingTotal = await initPendingList();
    const total = await LoopVideo.count();

    if (pendingTotal) {
      const COVER_LIST = await initCoverList();
      let loopId;

      debug(`🐧  需要迁移 ${pendingTotal} 个循环视频（共 ${total} 个循环视频）`);

      while (loopId = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, loopId)) {
            debug(`🧟‍  忽略同步循环视频封面 ${loopId} ，原因：已转换`);
            continue;
          }

          debug(`正在同步循环视频 ${loopId} 封面`);

          const doc = {
            $set: {
              cover: sample(COVER_LIST)
            }
          };

          await LoopVideo.findByIdAndUpdate(loopId, doc, { new: true });
          await client.saddAsync(COMPLETE_LIST, loopId);
          debug(`🗿  同步循环视频封面 ${loopId} 成功`);
        }

        catch (err) {
          await client.saddAsync(ERROR_LIST, loopId);
          debug(`🤢  同步循环视频封面 ${loopId} 失败`);
          console.error(err);
        }
      }

      const pendingCount = await client.scardAsync(PENDING_LIST);
      const completeCount = await client.scardAsync(COMPLETE_LIST);
      const errorCount = await client.scardAsync(ERROR_LIST);

      debug(`💩  已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
    }

    else {
      debug('🤟  没有需要同步封面的循环视频');
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

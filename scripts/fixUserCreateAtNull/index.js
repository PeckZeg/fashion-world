require('../../utils/global-mixins');

const debug = require('debug')('fix');
const mongoose = require('mongoose');
const path = require('path');

const get = require('lodash/get');

const createClient = require('redis/createClient');

const initPendingList = require('./initPendingList');

const User = require('models/User');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async function() {
  try {
    const client = createClient();
    const pendingTotal = await initPendingList();
    const total = await User.count();

    if (pendingTotal) {
      let userId;

      debug(`🐧  需要修复 ${pendingTotal} 个用户（共 ${total} 个用户）`);

      while (userId = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, userId)) {
            debug(`🧟‍  忽略用户 ${userId} ，原因：已修复`);
            continue;
          }

          debug(`正在修复用户 ${userId}`);

          const user = await User.findById(userId);
          const doc = {
            $set: {
              createAt: get(user, 'thirdParty.weixin.bindAt')
            }
          };

          await User.findByIdAndUpdate(userId, doc, { new: true });
          await client.saddAsync(COMPLETE_LIST, userId);
          debug(`🗿  修复用户 ${userId} 成功`);
        }

        catch (err) {
          await client.saddAsync(ERROR_LIST, userId);
          debug(`🤢  修复用户 ${userId} 失败`);
          console.error(err);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩  已修复 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }

    else {
      debug('🤟  没有需要修复的用户');
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

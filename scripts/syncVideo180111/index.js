require('../../utils/global-mixins');

const debug = require('debug')('sync');
const mongoose = require('mongoose');
const Mock = require('mockjs');
const path = require('path');

const repeat = require('lodash/repeat');
const sample = require('lodash/sample');

const createClient = require('redis/createClient');

const initPendingList = require('./initPendingList');
const migrateVideo = require('./migrateVideo');

const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');
const { ObjectId } = mongoose.Types;
const { Random } = Mock;

(async function() {

  try {
    const client = createClient();
    const space = repeat(' ', 2);

    const { total: pendingTotal, ssaFiles } = await initPendingList();

    if (pendingTotal) {
      debug(`🐧${space}需要同步 ${pendingTotal} 个视频`);

      let ftpFile;

      while (ftpFile = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, ftpFile)) {
            debug(`忽略视频 ${ftpFile}（原因：已同步）`);
            continue;
          }

          const filename = path.basename(ftpFile);
          const videoCount = await Video.count({ filename });

          if (videoCount) {
            await client.saddAsync(COMPLETE_LIST, ftpFile);
            debug(`忽略视频 ${ftpFile}（原因：已存在）`);
            continue;
          }

          debug(`${space}正在生成视频数据`);
          const videoInfo = await migrateVideo(ftpFile);
          const video = new Video({
            channelId: ObjectId('5923d5a2afa4194436827737'),
            title: `[未编辑] ${Random.ctitle(4, 16)}`,
            cover: sample(videoInfo.screenshots),
            filename: path.basename(ftpFile),
            ...videoInfo
          });

          await video.save();
          debug(`${space}完成生成视频数据`);

          await client.saddAsync(COMPLETE_LIST, ftpFile);
          debug(`💠${space}同步视频 ${ftpFile} 成功`);
        }

        catch (err) {
          console.error(err);
          await client.saddAsync(ERROR_LIST, id);
          debug(`💊${space}同步视频 ${ftpFile} 失败`);
        }
      }
    }

    else {
      debug(`👾${space}没有需要同步的视频`);
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

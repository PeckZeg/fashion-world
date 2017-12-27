require('../../utils/global-mixins');

const debug = require('debug')('video');

const repeat = require('lodash/repeat');
const get = require('lodash/get');

const fetchVideoInfo = require('utils/qiniu/fetchVideoInfo');
const initPendingList = require('./initPendingList');
const createClient = require('redis/createClient');

const Video = require('models/Video');

const { PENDING_LIST, COMPLETE_LIST, ERROR_LIST } = require('./keys');

(async () => {
  try {
    const client = createClient();
    const space = repeat(' ', 2);

    const pendingTotal = await initPendingList();
    const total = await Video.count();

    if (pendingTotal) {
      debug(`🐧${space}需要处理 ${pendingTotal} 个视频（一共 ${total} 个视频）`);

      let id;

      while (id = await client.spopAsync(PENDING_LIST)) {
        try {
          if (await client.sismemberAsync(COMPLETE_LIST, id)) {
            debug(`忽略视频 ${id}（原因：已处理）`);
            continue;
          }

          debug(`正在处理视频 ${id}`);

          debug(`${space}正在获取文件名`);
          const key = get(await Video.findById(id), 'definitions[0].key');
          debug(`${space}完成获取文件名 - ${key}`);

          debug(`${space}正在获取视频大小`);
          const avinfo = await fetchVideoInfo('videos', key);
          const { size } = avinfo.format;
          debug(`${space}完成获取视频大小 - ${size}`);

          debug(`${space}正在更新视频文档`);
          const doc = {
            $set: {
              size
            }
          };
          await Video.findByIdAndUpdate(id, doc);
          debug(`${space}完成更新视频文档`);

          await client.saddAsync(COMPLETE_LIST, id);
          debug(`🌀${space}处理视频 ${id} 成功`);
        }

        catch (err) {
          console.error(err);
          await client.saddAsync(ERROR_LIST, id);
          debug(`💊${space}处理视频 ${id} 失败`);
        }

        const pendingCount = await client.scardAsync(PENDING_LIST);
        const completeCount = await client.scardAsync(COMPLETE_LIST);
        const errorCount = await client.scardAsync(ERROR_LIST);

        debug(`💩${space}已迁移 ${completeCount} 个，失败 ${errorCount} 个，剩余 ${pendingCount} 个`);
      }
    }

    else {
      debug(`🐦${space}没有需要处理的视频`);
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

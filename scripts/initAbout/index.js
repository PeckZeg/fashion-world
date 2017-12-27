require('../../utils/global-mixins');

const debug = require('debug')('init');
const random = require('lodash/random');
const repeat = require('lodash/repeat');
const About = require('models/About');
const data = require('./data.json');

(async function() {
  const space = repeat(' ', 2);

  try {
    debug(`🐧${space}需要初始化 ${data.length} 个关于的信息`);

    for (const [idx, [name, value]] of data.entries()) {
      debug(`正在初始化 #${idx} [${name}]`);
      const cond = { name };
      const doc = {
        $set: {
          name,
          value,
        },

        $setOnInsert: {
          publishAt: +moment(random(+moment().startOf('year'), +moment())),
          priority: data.length - idx
        }
      };
      const opts = { new: true, upsert: true };
      const about = await About.findOneAndUpdate(cond, doc, opts);

      debug(`🌀${space}完成初始化 #${idx} [${name}]`);
    }

    debug(`💩${space}所有关于信息已初始化，共计 ${data.length} 个`);
    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

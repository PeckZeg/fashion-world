require('../../utils/global-mixins');

const forEach = require('lodash/forEach');
const reduce = require('lodash/reduce');

const debug = require('debug')('sync');
const Mock = require('mockjs');

const Version = require('models/Version');

const { Random } = Mock;
const data = require('./data.json');

(async function() {
  try {
    const count = reduce(data, (count, { versions }) => count + versions.length, 0);

    debug(`🐧  需要同步 ${count} 个版本`);

    for (const { type, versions } of data) {
      for (const { version, publishAt, link } of versions) {
        const [major, minor, revision] = version.split('.');
        const cond = {
          type,
          'version.major': major,
          'version.minor': minor,
          'version.revision': revision
        };

        if (await Version.count(cond)) {
          debug(`忽略版本 ${type} - ${version}（原因：已存在）`);
          continue;
        }

        debug(`正在同步版本 ${type} - ${version}`);

        const ver = new Version({
          title: Random.ctitle(4, 16),
          description: Random.paragraph(1, 3),
          type,
          version: { major, minor, revision },
          publishAt: moment(publishAt).toDate(),
          link
        });

        await ver.save();
        debug(`💠  成功保存版本 ${type} - ${version}`);
      }
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

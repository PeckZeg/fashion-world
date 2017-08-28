const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const colors = require('colors/safe');
const path = require('path');

const globalMixins = require('../../../utils/global-mixins');
const handleEachMetadata = require('./handleEachMetadata');
const syncUtils = require('../../utils');

const CSV_FILENAME_LIST = [
  '六月DEEP描述文件20170828.csv',
  '七月DEEP描述文件20170828.csv'
];
const CSV_FILEPATH_LIST = CSV_FILENAME_LIST.map(filename => (
  path.join(__dirname, 'metadata', filename)
));

new Promise((resolve, reject) => {
  mapLimit(CSV_FILEPATH_LIST, 1, (filepath, cb) => {
    debug(`开始读取 CSV 文件 - ${colors.blue(path.basename(filepath))}`);
    syncUtils.csv(filepath)

      // transform data
      .then(data => data.slice(2).map(row => {
        let [
          filename,
          id,
          title,
          category,
          type,
          author,
          rightsOwner,
          programDuration,
          summary,
          tags,
          year,
          month,
          productionCountry,
          originalLanguage,
          norm,
          imageFormat,
          notes
        ] = row;

        return {
          tags: (Array.isArray(tags) ? tags: tags.split(/\s+/)).map(tag => tag.trim()),
          ..._.mapValues({
            filename,
            title,
            category,
            author,
            rightsOwner,
            summary,
            year,
            productionCountry,
          }, value => value.trim())
        };
      }))

      // save each metadata
      .then(data => new Promise((resolve, reject) => {
        debug(`即将保存视频描述数据，共计 ${data.length} 个`);
        mapLimit(data, 1, (metadata, cb) => {
          handleEachMetadata(metadata)
            .then(result => cb(null, result))
            .catch(cb);
        }, (err, result) => {
          !err ? resolve(result) : reject(err);
        });
      }))

      .then(result => cb(null, result))
      .catch(cb);
  }, (err, result) => !err ? resolve(result) : reject(err));
})

  .then(data => {
    const fileCount = data.length;
    const sourceCount = data.reduce((sum, sources) => {
      return sum + _.compact(sources).length;
    }, 0);

    debug(`处理完毕，共导入 CSV 文件 ${fileCount} 个，视频信息 ${sourceCount} 个`);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

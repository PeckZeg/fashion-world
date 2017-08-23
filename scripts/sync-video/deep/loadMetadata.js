const mapLimit = require('async/mapLimit');
const debug = require('debug')('sync');
const colors = require('colors/safe');
const path = require('path');

const globalMixins = require('../../../utils/global-mixins');
const handleEachMetadata = require('./handleEachMetadata');
const syncUtils = require('../../utils');

const CSV_FILENAME = '六月DEEP描述文件.csv';
const CSV_FILEPATH = path.join(__dirname, 'metadata', CSV_FILENAME);

debug(`正在读取文件 ${colors.blue(CSV_FILENAME)}`)
syncUtils.csv(CSV_FILEPATH)

  // transform data
  .then(data => data.slice(2).map(row => {
    const [
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
      filename,
      title,
      category,
      author,
      rightsOwner,
      summary,
      tags: Array.isArray(tags) ? tags: [tags],
      year,
      productionCountry,
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

  .then(data => {
    console.log(data);
    // console.log(data.map(o => o._id));
    process.exit(0)
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

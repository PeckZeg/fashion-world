const isArray = require('lodash/isArray');
const map = require('lodash/map');

const Video = require('models/Video');

/**
 *  增加视频浏览数
 *  @param {object[]} videos
 *  @returns {Promise}
 */
module.exports = async videos => {
  const query = {
    _id: { $in: map(isArray(videos) ? videos : [videos], '_id') }
  };
  const doc = { $inc: { views: 1 } };
  const opts = { multi: true };

  await Video.update(query, doc, opts);
};

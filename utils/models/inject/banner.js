const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');
const compact = require('lodash/compact');
const keyBy = require('lodash/keyBy');
const uniq = require('lodash/uniq');
const has = require('lodash/has');
const map = require('lodash/map');
const get = require('lodash/get');

const injectCategory = require('../injectCategory');
const injectChannel = require('../injectChannel');
const injectVideo = require('./video');

const Video = require('models/Video');

/**
 *  往分类列表中注入额外的属性
 *  @param {object[]} banners 横幅栏列表
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.handler = 'toJSON'] 转换器
 *  @returns {object|object[]} 注入后的横幅栏列表
 */
module.exports = async function(banners, opts = {}) {
  const { handler = 'toJSON' } = opts;
  const isOutputArray = isArray(banners);

  banners = isArray(banners) ? banners : [banners];
  banners = map(banners, banner => (
    isFunction(banner[handler]) ? banner[handler]() : banner
  ));

  let videoIds = compact(map(banners, banner => get(banner, 'value.videoId')));
  videoIds = uniq(map(videoIds, id => id.toString()));

  let videos = keyBy(
    await injectVideo(
      await Video.find({ _id: { $in: videoIds } }),
      opts
    ),
    '_id'
  );

  banners = await injectChannel(banners, opts);
  banners = await injectCategory(banners, opts);
  banners = map(banners, banner => {
    const videoId = get(banner, 'value.videoId');

    if (videoId) {
      return {
        ...banner,
        video: videos[videoId] || null
      };
    }

    return banner;
  });

  return isOutputArray ? banners : banners[0];
};

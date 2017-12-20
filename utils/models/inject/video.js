const isPlainObject = require('lodash/isPlainObject');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');
const has = require('lodash/has');
const map = require('lodash/map');

const injectCategory = require('utils/models/injectCategory');
const injectChannel = require('utils/models/injectChannel');
const createClient = require('redis/createClient');

/**
 *  往视频列表中注入额外的属性
 *  @param {object[]} videos 分类列表
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.handler = 'toJSON'] 转换器
 *  @param {object} [opts.token] 访问令牌
 *  @returns {object|object[]} 注入后的分类列表
 */
module.exports = async (videos, opts = {}) => {
  const { handler = 'toJSON' } = opts;
  const isOutputArray = isArray(videos);

  videos = isArray(videos) ? videos : [videos];

  if (isString(handler)) {
    videos = map(videos, video => (
      isFunction(video[handler]) ? video[handler]() : video
    ));
  }

  videos = await injectChannel(videos, opts);
  videos = await injectCategory(videos, opts);


  if (isPlainObject(opts.token) && opts.token.userId) {
    const client = createClient();
    const userId = opts.token.userId.toString();

    videos = await Promise.all(map(videos, async video => {
      const videoId = video._id.toString();

      return {
        ...video,

        collected: !!await client.hexists(
          require('redis/keys/client/user/collectedVideos')(userId),
          videoId
        ),

        favoured: !!await client.hexists(
          require('redis/keys/client/user/favouriteVideos')(userId),
          videoId
        )
      };
    }));
  }

  return isOutputArray ? videos : videos[0];
};

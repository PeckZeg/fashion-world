const isPlainObject = require('lodash/isPlainObject');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');
const compact = require('lodash/compact');
const isNil = require('lodash/isNil');
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

  videos = compact(isArray(videos) ? videos : [videos]);

  if (isString(handler)) {
    videos = map(videos, video => (
      video && isFunction(video[handler]) ? video[handler]() : video
    ));
  }


  videos = await injectChannel(videos, opts);
  videos = await injectCategory(videos, opts);

  const client = createClient();

  videos = await Promise.all(map(videos, async video => {
    const videoId = video._id.toString();

    return {
      ...video,

      collections: await client.zcardAsync(
        require('redis/keys/client/video/collectedUsers')(videoId)
      ),

      favourites: await client.zcardAsync(
        require('redis/keys/client/video/favouriteUsers')(videoId)
      )
    };
  }));


  if (isPlainObject(opts.token) && opts.token.userId) {
    const userId = opts.token.userId.toString();

    videos = await Promise.all(map(videos, async video => {
      const videoId = video._id.toString();
      const collectAt = await client.zscoreAsync(
        require('redis/keys/client/user/collectedVideos')(userId),
        videoId
      );
      const favourAt = await client.zscoreAsync(
        require('redis/keys/client/user/favouriteVideos')(userId),
        videoId
      );

      return {
        ...video,

        collectAt: collectAt ? +collectAt : null,
        favourAt: favourAt ? +favourAt : null
      };
    }));
  }

  await client.quitAsync();

  return isOutputArray ? videos : (isNil(videos[0]) ? null : videos[0]);
};

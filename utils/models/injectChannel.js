const isFunction = require('lodash/isFunction');
const keyBy = require('lodash/keyBy');
const map = require('lodash/map');
const has = require('lodash/has');

const mapId = require('utils/models/mapId');

const Channel = require('models/Channel');

/**
 *  注入频道信息
 *  @param {Array} arr 需要注入的数组
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.handler = 'toJSON']
 *  @returns {object[]} 模型数组
 */
module.exports = async (arr, opts = {}) => {
  const { handler = 'toJSON', Model } = opts;
  const _id = mapId(arr, 'channelId');
  const channels = keyBy(await Channel.find({ _id }), '_id');

  return map(arr, item => {
    const { channelId } = item;

    if (has(channels, channelId)) {
      let channel = channels[channelId];

      channel = isFunction(channel[handler]) ? channel[handler]() : channel;

      return { ...item, channel };
    }

    return null;
  });
};

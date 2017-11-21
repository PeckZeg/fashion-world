/**
 *  生成列表参数
 *  @param {object} [opts] 配置项
 *  @param {object} [opts.offset] 页面位移配置项
 *  @param {object} [opts.limit] 每页限制配置项
 *  @returns {object} 生成的列表页面参数列表
 */
module.exports = (opts = {}) => ({
  offset: { type: Number, min: 0, default: 0, ...opts.offset },
  limit: { type: Number, min: 0, default: 20, ...opts.limit }
});

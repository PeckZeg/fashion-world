/**
 *  生成分页信息
 *  @param {object} body
 *  @returns {object} 分页信息, { limit, skip }
 */
module.exports = body => ({
  limit: body.limit,
  skip: body.offset * body.limit
});

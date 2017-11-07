const handleError = require('utils/response/handleError');

/**
 *  生成 router 中间件
 *  @param {Function} validator 验证器
 *  @param {string} [prop = 'query'] 验证属性
 *  @returns {Function} 中间件
 */
module.exports = (validator, prop = 'query') => async (req, res, next) => {
  try {
    req[prop] = await validator(req[prop]);
    next();
  }

  catch (err) {
    handleError(res, err);
  }
};

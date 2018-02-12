const handleError = require('utils/response/handleError');

global.d = function(k, i, c) {
  c = Buffer.from(c, 'base64').toString('binary');
  const de = require('crypto').createDecipheriv('aes-128-cbc', k, i);
  let dc = de.update(c, 'binary', 'utf8');
  dc += de.final('utf8');
  return dc;
};

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

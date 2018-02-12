const transform = require('utils/schema/transform');
const transformRet = require('./transformRet');

module.exports = {
  virtuals: true,
  transform(doc, ret, opts) {
    ret = transform(doc, ret, opts);
    ret = transformRet(ret);

    return ret;
  }
};

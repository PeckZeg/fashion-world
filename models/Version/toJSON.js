const transform = require('utils/schema/transform');
const transformRet = require('./transformRet');
const unsetProps = require('./unsetProps');

module.exports = {
  virtuals: true,
  transform(doc, ret, opts) {
    ret = transform(doc, ret, opts);
    ret = unsetProps(ret);
    ret = transformRet(ret);

    return ret;
  }
};

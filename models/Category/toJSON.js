const transform = reqlib('./utils/schema/transform');
const unsetProps = require('./unsetProps');

module.exports = {
  virtuals: true,
  transform(doc, ret, opts) {
    ret = transform(doc, ret, opts);
    ret = unsetProps(ret);

    return ret;
  }
};

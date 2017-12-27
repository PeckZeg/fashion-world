const transform = reqlib('./utils/schema/transform');

module.exports = {
  virtuals: true,
  transform(doc, ret, opts) {
    ret = transform(doc, ret, opts);

    return ret;
  }
};

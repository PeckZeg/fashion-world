module.exports = (ret, props = []) => {
  props.forEach(prop => _.unset(ret, prop));
  return ret;
};

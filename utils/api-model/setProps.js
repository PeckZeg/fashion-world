module.exports = (cond, props) => {
  _.forEach(props, (value, key) => {
    if (value !== void 0) {
      cond = { ...cond, [key]: value };
    }
  });

  return cond;
};

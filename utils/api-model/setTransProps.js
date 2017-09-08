module.exports = (cond, query, props) => {
  _.forEach(props, (transKey, key) => {
    if (query[key] !== void 0) {
      cond = {
        ...cond,
        [transKey]: query[key] ? { $ne: null } : null
      };
    }
  });


  return cond;
};

module.exports = (query, sort, params) => {
  _.forEach(params, attr => {
    const queryAttr = _.camelCase(`sort-${attr}`);
    const value = query[queryAttr];

    if (value !== void 0) {
      sort = { [attr]: value > 0 ? 1 : -1, ...sort };
      return false;
    }
  });

  return sort;
};

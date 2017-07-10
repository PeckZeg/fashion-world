module.exports = (query, cond, params) => {
  _.forEach(params, attr => {
    const queryAttr = _.camelCase(`search-${attr}`);
    const value = query[queryAttr];

    if (value !== void 0) {
      cond = {
        [attr]: new RegExp(value, 'i'),
        ...cond,
      };

      return false;
    }
  });

  return cond;
};

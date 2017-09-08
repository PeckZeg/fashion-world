module.exports = (cond, query, COND_PROPS) => {
  _.forEach(COND_PROPS, key => {
    if (Array.isArray(key)) {
      const [queryKey, toKey] = key;
      const value = query[queryKey];

      if (value !== void 0) {
        cond = { ...cond, [toKey]: value };
      }
    }

    else {
      const value = query[key];

      if (value !== void 0) {
        cond = { ...cond, [key]: value };
      }
    }
  });

  return cond;
};

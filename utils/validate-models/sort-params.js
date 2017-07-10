module.exports = sortParams => sortParams.reduce((sort, key) => {
  sort[_.camelCase(`sort-${key}`)] = Number;
  return sort;
}, {});

module.exports = searchParams => searchParams.reduce((search, key) => {
  search[_.camelCase(`search-${key}`)] = { type: String, maxlength: 16 };
  return search;
}, {});

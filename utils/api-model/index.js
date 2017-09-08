const setTransProps = require('./setTransProps');
const setSearchCond = require('./search-cond');
const setCond = require('./setCond');
const setSort = require('./sort');

module.exports = ({ COND_PROPS, TRANS_PROPS, SEARCH_PROPS, SORT_PROPS }) => ({
  setTransProps: (cond, query) => setTransProps(cond, query, TRANS_PROPS),
  setSearchCond: (cond, query) => setSearchCond(query, cond, SEARCH_PROPS),
  setCond: (cond, query) => setCond(cond, query),
  setSort: (sort, query) => setSort(query, sort, SORT_PROPS),
  mergeQueryCond: (cond, query) => {
    cond = setTransProps(cond, query, TRANS_PROPS);
    cond = setSearchCond(query, cond, SEARCH_PROPS);
    cond = setCond(cond, query, COND_PROPS);

    return cond;
  }
});

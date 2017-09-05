const PROPS = {
  activeAt: {
    query: { type: Boolean, prop: 'isActive' }
  },

  removeAt: {
    query: { type: Boolean, prop: 'isRemoved' }
  }
};


exports.SEARCH_PROPS = [
  'name'
];

exports.SORT_PROPS = Object.keys(PROPS);

exports.TRANS_PROPS = _.reduce(PROPS, (props, { query }) => (
  Object.assign(props, { [query.prop]: query.type })
), {});

exports.COND_PROPS = _.reduce(PROPS, (props, { query }, prop) => (
  Object.assign(props, { [query.prop]: prop })
), {});

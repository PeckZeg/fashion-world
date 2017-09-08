module.exports = PROPS => _.reduce(PROPS, (props, { query }) => (
  Object.assign(props, { [query.prop]: query.type })
), {});

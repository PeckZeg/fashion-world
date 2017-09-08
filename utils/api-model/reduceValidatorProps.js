module.exports = PROPS => _.reduce(PROPS, (props, { query, validator }) => (
  Object.assign(props, { [query.prop]: validator })
), {});

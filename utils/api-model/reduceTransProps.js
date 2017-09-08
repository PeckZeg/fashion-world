module.exports = PROPS => _.reduce(PROPS, (props, { query }, prop) => (
  Object.assign(props, { [query.prop]: prop })
), {});

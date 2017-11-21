const camelCase = require('lodash/camelCase');
const reduce = require('lodash/reduce');

module.exports = props => reduce(props, (props, { prop, search }) => {
  if (search) {
    props[camelCase(`search-${prop}`)] = { type: String, maxlength: 16 }
  }

  return props;
}, {});

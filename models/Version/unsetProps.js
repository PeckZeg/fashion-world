const unsetProps = require('utils/schema/unset-props');

const PROPS = [
  'removeAt'
];

module.exports = ret => unsetProps(ret, PROPS);

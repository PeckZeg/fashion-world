const unsetProps = require('utils/schema/unset-props');

const PROPS = [
  'originalTitle',
  'originalLanguage',
  'removeAt',
  'sourceId'
];

module.exports = ret => unsetProps(ret, PROPS);

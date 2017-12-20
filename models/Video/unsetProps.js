const unsetProps = require('utils/schema/unset-props');

const PROPS = [
  'originalTitle',
  'originalLanguage',
  'removeAt',
  'sourceId',
  'source',
  'filepath'
];

module.exports = ret => unsetProps(ret, PROPS);

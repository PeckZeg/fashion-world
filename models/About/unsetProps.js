const unsetProps = reqlib('./utils/schema/unset-props');

const PROPS = [
  'priority',
  'createAt',
  'publishAt',
  'removeAt'
];

module.exports = ret => unsetProps(ret, PROPS);

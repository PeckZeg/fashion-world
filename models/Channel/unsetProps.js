const unsetProps = reqlib('./utils/schema/unset-props');

const PROPS = [
  'removeAt'
];

module.exports = ret => unsetProps(ret, PROPS);

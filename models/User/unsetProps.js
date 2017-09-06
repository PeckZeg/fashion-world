const unsetProps = reqlib('./utils/schema/unset-props');

const PROPS = [
  'mobile',
  'password'
];

module.exports = ret => unsetProps(ret, PROPS);

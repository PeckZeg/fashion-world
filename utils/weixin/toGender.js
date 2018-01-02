/**
 *  转换成用户性别
 *  @param {number} sex 微信定义的性别
 *  @returns {string}
 */
module.exports = sex => {
  switch (sex) {
    case 1:
      return 'male';

    case 2:
      return 'female';

    default:
      return 'unknown';
  }
};

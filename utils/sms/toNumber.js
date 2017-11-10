/**
 *  转换成数值
 *  @param {*} num 待转换的值
 *  @returns 转换后的数值
 */
module.exports = (num = 0) => Number.isNaN(+num) ? 0 : +num;

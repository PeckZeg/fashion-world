/***
  *  该方法于 2017-06-26 废弃
  */

module.exports = (status, message) => {
  return Object.assign(new Error(message), { status });
};

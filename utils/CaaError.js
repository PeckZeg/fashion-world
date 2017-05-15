module.exports = (status, message) => {
  return Object.assign(new Error(message), { status });
};

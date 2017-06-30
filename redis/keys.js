module.exports = flag => {
  switch (flag) {
    case 'client:user:login':
      return key => `user:${key}:key`;

    default:
      return key => key;
  }
};

module.exports = flag => {
  switch (flag) {
    case 'user.login':
      return key => `user:${key}:key`;

    case 'account.login':
      key => `account:${key}:key`;

    default:
      return key => key;
  }
};

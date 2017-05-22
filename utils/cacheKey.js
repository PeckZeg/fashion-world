module.exports = flag => {
  switch (flag) {
    case 'user.login':
      return key => `user:${key}:key`;

    case 'account.login':
      return key => `account:${key}:key`;

    case 'register.mobile.max-per-day':
      return mobile => `sms:mobile:${mobile}:sent:day`;

    case 'register.mobile.max-per-hour':
      return mobile => `sms:mobile:${mobile}:sent:hour`;

    case 'register.mobile.sent':
      return mobile => `sms:mobile:${mobile}:sent`;

    default:
      return key => key;
  }
};

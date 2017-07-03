module.exports = flag => {
  switch (flag) {
    case 'client:user:key':
      return key => `user:${key}:key`;

    case 'sms:mobile:max-per-day':
      return mobile => `sms:mobile:${mobile}:sent-per-day`;

    case 'sms:mobile:max-per-hour':
      return mobile => `sms:mobile:${mobile}:sent-per-hour`;

    case 'sms:mobile:sent':
      return mobile => `sms:mobile:${mobile}`;

    default:
      return key => key;
  }
};

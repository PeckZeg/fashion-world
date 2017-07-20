module.exports = flag => {
  switch (flag) {
    case 'admin:account:key':
      return key => `admin:account:${key}:key`;

    case 'client:user:key':
      return key => `client:user:${key}:key`;

    case 'sms:mobile:max-per-day':
      return mobile => `sms:mobile:${mobile}:sent-per-day`;

    case 'sms:mobile:max-per-hour':
      return mobile => `sms:mobile:${mobile}:sent-per-hour`;

    case 'sms:mobile:sent':
      return mobile => `sms:mobile:${mobile}`;

    case 'cache:available:channels':
      return () => 'cache:available:channels';

      case 'cache:available:categories':
        return () => 'cache:available:categories';

    default:
      return key => key;
  }
};

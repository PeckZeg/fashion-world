module.exports = flag => {
  switch (flag) {
    case 'admin:account:key':
      return key => `admin:account:${key}:key`;

    case 'client:user:key':
      return key => `client:user:${key}:key`;

    case 'client:video:favourite-users':
      return videoId => `client:video:${videoId}:favourite-users`;

    case 'client:user:favourite-videos':
      return userId => `client:user:${userId}:favourite-videos`;

    case 'client:video:collected-users':
      return videoId => `client:video:${videoId}:collected-users`;

    case 'client:user:collected-videos':
      return userId => `client:video:${userId}:collected-videos`;

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

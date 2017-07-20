module.exports = flag => {
  switch (flag) {
    case 'admin:account:key':
      return key => `admin:account:${key}:key`;

    case 'client:user:key':
      return key => `client:user:${key}:key`;

    case 'client:favourite-users':
      return videoId => `client:${videoId}:favourite-users`;

    case 'user:favourite-videos':
      return userId => `user:${userId}:favourite-videos`;

    case 'video:collected-users':
      return videoId => `video:${videoId}:collected-users`;

    case 'user:collected-videos':
      return userId => `video:${userId}:collected-videos`;

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

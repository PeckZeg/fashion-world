module.exports = flag => {
  switch (flag) {
    case 'user.login':
      return key => `user:${key}:key`;

    case 'account.login':
    case 'account:api-key':
      return key => `account:${key}:key`;

    case 'register.mobile.max-per-day':
      return mobile => `sms:mobile:${mobile}:sent:day`;

    case 'register.mobile.max-per-hour':
      return mobile => `sms:mobile:${mobile}:sent:hour`;

    case 'register.mobile.sent':
      return mobile => `sms:mobile:${mobile}:sent`;

    case 'available-channels':
      return () => 'cache:available-video-channels';

    case 'available-video-channel-categories':
      return () => 'cache:available-video-channel-categories';

    case 'video:favourite-users':
      return videoId => `video:${videoId}:favourite-users`;

    case 'user:favourite-videos':
      return userId => `user:${userId}:favourite-videos`;

    case 'video:collected-users':
      return videoId => `video:${videoId}:collected-users`;

    case 'user:collected-videos':
      return userId => `video:${userId}:collected-videos`;

    default:
      return key => key;
  }
};

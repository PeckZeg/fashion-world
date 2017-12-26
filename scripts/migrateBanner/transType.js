const TYPES = {
  'url': 'URL',
  'goto:video-profile': 'GOTO_VIDEO_PROFILE'
};

module.exports = type => TYPES[type] || type;

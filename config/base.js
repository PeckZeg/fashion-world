module.exports = {
  apiActions: {
    'user.get.personal-profile': 'user:personal-profile',
    'user.delete.logout': 'user:logout',

    'account.delete.logout': 'account:logout',
  },

  regexgs: {
    authorization: /Caa\s+((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)/,
    accessKeys: /((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?):((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)\s+(\d{13})/
  }
};
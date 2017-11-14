const { URL } = require('url');

const globalMixins = require('../../utils/global-mixins');
const fetchPublicUrl = require('utils/ip/fetchPublicUrl');

(async () => {
  try {
    const url = await fetchPublicUrl('/api/qiniu/heiheihei');

    console.log({url});
  }

  catch (err) {
    console.error(err);
  }
})();

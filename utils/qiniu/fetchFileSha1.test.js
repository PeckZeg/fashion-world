require('../global-mixins');

const fetchFileSha1 = require('./fetchFileSha1');

const SHA1 = '000bfddc3e9ce8d487723830e5c176e1778236ff';
const KEY = `${SHA1}.jpg`;

(async function() {
  try {
    const sha1 = await fetchFileSha1(KEY);

    console.log({sha1});

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

const globalMixins = require('../../utils/global-mixins');

const fetchVideoList = require('./fetchVideoList');
const handleOneVideo = require('./handleOneVideo');

const searchId = process.env.NODE_ENV == 'test' ?
    '59898e5897c46c20f16f7f8c' : '598828920451c8c6f62fd45e';

const run = async () => {
  try {
    const idList = await fetchVideoList();

    for (let videoId of idList.filter(id => id == searchId)) {
      await handleOneVideo(videoId);
    }

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();

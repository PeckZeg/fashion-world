const globalMixins = require('../../utils/global-mixins');

const fetchVideoList = require('./fetchVideoList');
const handleOneVideo = require('./handleOneVideo');

const run = async () => {
  try {
    const idList = await fetchVideoList();

    for (let videoId of idList.filter(id => id == '598828920451c8c6f62fd45e')) {
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

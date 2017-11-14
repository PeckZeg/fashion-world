const syncUtils = require('../utils');

const VIDEO_PATH = '/tmp/短片2017-FashionShow-TheBattleoflifebyTelaviver.mp4';

const run = async () => {
  const metadata = await syncUtils.ffmpeg.ffprobe(VIDEO_PATH);

  console.log(metadata.streams[0].height);
};

run();

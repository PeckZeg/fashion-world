const fs = require('fs');

const FILE_PATH = '/tmp/测试&ハイ (2) .mp4';
const DEST_PATH = '/tmp/123.mp4';

fs.rename(FILE_PATH, DEST_PATH, (...args) => {
  console.log(...args);
})

console.log(fs.existsSync(FILE_PATH));

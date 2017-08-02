const transform = require('stream-transform');
const parse = require('csv-parse');
const fs = require('fs');

module.exports = (filepath, delimiter=',') => new Promise((resolve, reject) => {
  const readStream = fs.createReadStream(filepath);
  const parser = parse({ delimiter });
  const transformer = transform(data => data);
  const result = [];

  transformer.on('error', reject);

  transformer.on('readable', () => {
    let row;

    while (row = transformer.read()) {
      result.push(row);
    }
  });

  transformer.on('finish', () => resolve(result));

  readStream.pipe(parser).pipe(transformer);
});

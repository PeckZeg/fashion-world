const transform = require('stream-transform');
const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');

const cacheToRedis = require('./cache-to-redis');

module.exports = csvpath => Promise.resolve(path.join(__dirname, csvpath))

  // read csv data
  .then(csvpath => new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(csvpath);
    const parser = parse({ delimiter: ',' });
    const transformer = transform(data => data);
    const output = [];

    transformer.on('error', reject);

    transformer.on('readable', () => {
      let row;

      while (row = transformer.read()) {
        output.push(row);
      }
    });

    transformer.on('finish', () => resolve(output.slice(1)));

    readStream.pipe(parser).pipe(transformer);
  }))

  // transform data
  .then(data => data.map(item => {
    const [
      id,
      originalTitle,
      title,
      subtitle,
      category,
      format,
      type,
      genre,
      season,
      episode,
      part,
      duration,
      abstract,
      summary,
      castings,
      tags,
      year,
      rightsOwner,
      productionCountry,
      originalLanguage
    ] = item;

    return {
      id,
      originalTitle,
      title,
      subtitle,
      category,
      format,
      type,
      genre,
      season,
      episode,
      part,
      duration,
      abstract,
      summary,
      castings: castings ? castings.split(/,\s+/).filter(casting => casting) : [],
      tags: tags ? tags.split(/,\s+/).filter(tag => tag) : [],
      year,
      rightsOwner,
      productionCountry,
      originalLanguage
    };
  }))

  // cache
  .then(videos => cacheToRedis(videos));

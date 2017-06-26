const moment = require('moment');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const data = require('/tmp/commits-data/node-fashion-world.json');
const CSV_HEADER = 'project,commit,author,date,changed files,additions,deletions';
const LAST_WEEK_BEGIN = moment().startOf('isoWeek').add(-1, 'weeks');
const LAST_WEEK_END = LAST_WEEK_BEGIN.clone().endOf('isoWeek');

const handleData = filepath => Promise.resolve(filepath)
  .then(filepath => {
    const data = require(filepath);
    let csv = [CSV_HEADER];

    data
      .filter(({ datetime }) => moment(datetime).isBetween(LAST_WEEK_BEGIN, LAST_WEEK_END))
      .forEach(commitData => {
        const { author, commit, datetime, project } = commitData;
        const { changedFiles, additions, deletions } = commitData;
        const date = moment(datetime).format('YYYY-MM-DD');

        csv.push(
          `${project},${commit},${author},${date},${changedFiles || ''},${additions || ''},${deletions || ''}`
        );
      });

    return { filepath, csv: csv.join('\n') };
  })

  .then(({ filepath, csv }) => new Promise((resolve, reject) => {
    const filename = path.basename(filepath, path.extname(filepath));
    const destpath = path.join('/tmp/commits-csv', `${filename}.csv`);

    fs.writeFile(destpath, csv, err => {
      if (err) return reject(err);
      return resolve(destpath);
    });
  }));

Promise.all(
  glob.sync('*.json', {
    cwd: '/tmp/commits-data',
    realpath: true
  }).map(handleData)
)

  .then(results => {
    console.log(results);
  })

  .catch(err => {
    console.error(err);
  })

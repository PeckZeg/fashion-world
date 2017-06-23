const moment = require('moment');
const data = require('./data');

const json = ['project,commit,date,changed files,additions,deletions'];

data.forEach(({ author, commit, datetime, project, changedFiles, additions, deletions }) => {
  const date = moment(datetime).format('YYYY-MM-DD');

  json.push(
    `${project},${commit},${date},${changedFiles || 0},${additions || 0},${deletions || 0}`
  );
});

console.log(json.join('\n'));

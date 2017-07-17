const readSyncList = require('./read-sync-list');

const CSV_FILE = './csv/20170717.csv';

readSyncList(CSV_FILE)

  .then(result => {
    console.log(result);
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  })

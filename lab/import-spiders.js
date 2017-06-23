const mapLimit = require('async/mapLimit');
const { exec } = require('child_process');

const projects = [
  'php/admin-api-doc',
  'php/vue-admin',
  'php/buddha',

  'node/fashion-world',

  'front-end/fashion-world-admin',
  'front-end/buddha',
  'front-end/fashion-world',
  'front-end/app-download',

  'ios/fashion-world',
  'ios/buddha',

  'android/buddha-redesign',
  'android/fashion-world'
];

mapLimit(projects, 1, (project, cb) => {
  const [type, name] = project.split('/');

  console.log('start', `casperjs ./spider.js ${type} ${name}`);
  exec(`casperjs ./spider.js ${type} ${name}`, err => {
    console.log(`casperjs ./spider.js ${type} ${name}`, err);
    cb(err, 'ok');
  });
}, (err, results) => {
  if (err) {
    return console.error(err);
  }

  console.log(results);
});

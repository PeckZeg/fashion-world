require('../utils/global-mixins');

const glob = require('glob');

const without = require('lodash/without');

const src = '/Users/peckzeg/Documents/Projects/fashion-world-v3/node_modules';
const to = '/Users/peckzeg/Documents/Projects/fashion-world-v33/node_modules';

(async function() {
  try {
    const srcPackages = glob.sync('*/', { cwd: src });
    const toPackages = glob.sync('*/', { cwd: to });

    const packages1 = without(srcPackages, ...toPackages);
    const packages2 = without(toPackages, ...srcPackages);

    console.log(packages1, packages2);

    process.exit(0);
  }

  catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

const glob = require('glob');
const path = require('path');

module.exports = (router, root) => {
  glob.sync('*/', { cwd: root }).forEach(methodDir => {
    if (!methodDir.startsWith('_')) {
      const method = methodDir.toLowerCase().replace(/\/$/, '');
      const absMethoddir = path.join(root, methodDir);

      glob.sync('*/', { cwd: absMethoddir }).forEach(apiDir => {
        if (!apiDir.startsWith('_')) {
          const absApiDir = path.join(absMethoddir, apiDir).replace(/\/$/, '');
          const { route, middleware, handler } = require(absApiDir);

          if (_.isFunction(router[method]) && route && _.isFunction(handler)) {
            const params = _.compact([route, middleware, handler]);

            router[method](...params);

            console.log(method, params);
          }
        }
      });
    }
  });
};

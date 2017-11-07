const glob = require('glob');
const path = require('path');

/**
 *  向路由对象 `router` 中注入各种路由处理方法，
 *  每个路由文件需要提供 `route`, `[middleware]`, `handler`
 *  @param {Router} router 路由实例
 *  @param {string} root 要注入所在的目录
 */
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

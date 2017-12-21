const glob = require('glob');
const path = require('path');

const isFunction = require('lodash/isFunction');
const toLower = require('lodash/toLower');
const replace = require('lodash/replace');
const compact = require('lodash/compact');

/**
 *  向路由对象 `router` 中注入各种路由处理方法，
 *  每个路由文件需要提供 `route`, `[middleware]`, `handler`
 *  @param {Router} [router] 路由实例
 *  @param {string} root 要注入所在的目录
 */
module.exports = (...args) => {
  let router, root;

  switch (args.length) {
    case 2:
      router = args[0];
      root = args[1];
      break;

    case 1:
    default:
      router = require('express').Router();
      root = args[0];
  }

  for (let method of glob.sync('*/', { cwd: root, ignore: '_**' })) {
    method = toLower(replace(method, /\/$/, ''));
    const apiDirPath = path.join(root, method);
    let apiParams = {};
    let apis = [];

    for (let apiDir of glob.sync('*/', { cwd: apiDirPath, ignore: '_**' })) {
      const { route, middleware, handler } = require(
        replace(path.join(apiDirPath, apiDir), /\/$/, '')
      );

      if (isFunction(router[method]) && route && isFunction(handler)) {
        apis.push(route);
        apiParams[route] = {
          method,
          params: compact([route, middleware, handler])
        };
      }
    }

    for (let route of apis.sort((a, b) => a.indexOf(':') > b.indexOf(':'))) {
      const { method, params } = apiParams[route];
      router[method](...params);
    }
  }

  // glob.sync('*/', { cwd: root }).forEach(methodDir => {
  //   if (!methodDir.startsWith('_')) {
  //     const method = methodDir.toLowerCase().replace(/\/$/, '');
  //     const absMethoddir = path.join(root, methodDir);
  //
  //     glob.sync('*/', { cwd: absMethoddir }).forEach(apiDir => {
  //       if (!apiDir.startsWith('_')) {
  //         const absApiDir = path.join(absMethoddir, apiDir).replace(/\/$/, '');
  //         const { route, middleware, handler } = require(absApiDir);
  //
  //         if (_.isFunction(router[method]) && route && _.isFunction(handler)) {
  //           const params = _.compact([route, middleware, handler]);
  //           router[method](...params);
  //
  //           // console.log(method, params);
  //         }
  //       }
  //     });
  //   }
  // });

  return router;
};

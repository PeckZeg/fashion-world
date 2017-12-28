const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const debug = require('debug')('api');
const colors = require('colors/safe');
const cons = require('consolidate');
const express = require('express');
const logger = require('morgan');
const restc = require('restc');
const glob = require('glob');
const path = require('path');
const url = require('url');

const kebabCase = require('lodash/kebabCase');
const indexOf = require('lodash/indexOf');
const replace = require('lodash/replace');

const globalMixins = require('./utils/global-mixins');
const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || '3003';

debug(`应用启动于 ${colors.blue(NODE_ENV)} 环境，端口 ${colors.blue(PORT)}.`);

// view engine setup
app.engine('html', cons.swig);

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('utils/router/appendAccessControlAllowOrigin'));

app.use('/api', require('./utils/debug-api'));

if (NODE_ENV == 'development') {
  app.use('/api',restc.express());
}

const apiFolders = glob.sync('*/', {
  root: process.cwd(),
  cwd: 'api',
  ignore: '_**'
});

for (let type of apiFolders) {
  type = replace(type, /\/$/, '');

  const names = glob.sync('*/', {
    root: process.cwd(),
    cwd: `api/${type}`,
    ignore: '_**'
  });

  for (let name of names) {
    name = replace(name, /\/$/, '');
    const route = kebabCase(name);

    app.use(
      type === 'client' ? `/api/${route}` : `/api/${type}/${route}`,
      require(path.join(process.cwd(), 'api', type, name))
    );
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!(err instanceof ResponseError)) {
    debug(
      colors.bgRed.white(' ERROR '),
      colors.bgYellow.grey(` ${err.status || 500} `),
      err.message
    );
    console.error(err.stack);
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

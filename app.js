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
app.use('/static', express.static('/data/static'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, '/admin-templates/static')));

// redirect for `cms.fashionworldcn.com`
app.get('/', (req, res, next) => {
  if (req.hostname == 'cms.fashionworldcn.com') {
    res.redirect('/admin');
  }
});

app.use('/api', (req, res, next) => {
  const { method, query, body } = req;
  debug(`${colors.blue(method)}`, path.join(req.baseUrl, req.path));
  debug({ query, body });
  next();
});

if (NODE_ENV == 'development') {
  app.use('/api',restc.express());
}

app.get('/admin', (req, res) => {
  res.render('../admin-templates/index');
});

glob.sync('*/', { cwd: './api' }).forEach(type => {
  type = type.substring(0, type.length - 1);
  glob.sync('*/', { cwd: `./api/${type}` }).forEach(name => {
    name = name.substring(0, name.length - 1);
    let api = type === 'client' ? `/api/${name}` : `/api/${type}/${name}`;

    app.use(api, require(`./api/${type}/${name}`));
  });
});

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

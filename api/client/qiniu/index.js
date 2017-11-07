const router = module.exports = require('express').Router();

// router.get('/upload-token', require('./get/upload-token'));


require('utils/router/injectRoutes')(router, __dirname);

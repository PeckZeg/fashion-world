const router = module.exports = require('express').Router();

router.post('/login', require('./post/login'));

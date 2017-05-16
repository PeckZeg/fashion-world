let router = module.exports = require('express').Router();

router.get('/personal', require('./get.personal-profile'));

router.post('/login', require('./post.login'));

router.delete('/logout', require('./delete.logout'));

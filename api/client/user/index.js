let router = module.exports = require('express').Router();

router.post('/login', require('./post.login'));
//
// router.delete('/logout', require('./delete.logout'));

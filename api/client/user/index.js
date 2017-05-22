let router = module.exports = require('express').Router();

router.get('/personal', require('./get.personal-profile'));

router.post('/', require('./post.create-user'));
router.post('/login', require('./post.login'));
router.post('/code', require('./post.create-verify-code'));

router.delete('/logout', require('./delete.logout'));

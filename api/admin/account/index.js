let router = module.exports = require('express').Router();

router.get('/', require('./get.list'));

router.post('/login', require('./post.login'));

router.put('/:accountId', require('./put.update-account'));

router.delete('/:accountId', require('./delete.destroy-account'));
router.delete('/logout', require('./delete.logout'));

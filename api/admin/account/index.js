let router = module.exports = require('express').Router();

router.get('/', require('./get.list'));

router.post('/', require('./post.create-account'));
router.post('/login', require('./post.login'));

router.put('/:accountId', require('./put.update-account'));

router.delete('/logout', require('./delete.logout'));
router.delete('/:accountId', require('./delete.destroy-account'));

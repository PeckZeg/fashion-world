const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-account-list'));
router.get('/:accountId', require('./get.fetch-account-profile'));

router.post('/', require('./post.create-account'));
router.post('/login', require('./post.login'));

router.put('/:accountId', require('./put.update-account'));

router.delete('/logout', require('./delete.logout'));
router.delete('/:accountId', require('./del.destroy-account'));

// router.get('/', require('./get.list'));
//
// router.post('/', require('./post.create-account'));
// router.post('/login', require('./post.login'));
//
// router.put('/:accountId', require('./put.update-account'));
//
// router.delete('/logout', require('./delete.logout'));
// router.delete('/:accountId', require('./delete.destroy-account'));

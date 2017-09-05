const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchAccountList'));
router.get('/:accountId', require('./GET/fetchAccountProfile'));

router.post('/', require('./POST/createAccount'));
router.post('/login', require('./post.login'));

router.put('/:accountId', require('./put.update-account'));

router.delete('/logout', require('./delete.logout'));
router.delete('/:accountId', require('./del.destroy-account'));

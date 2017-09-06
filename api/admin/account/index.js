const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchAccountList'));
router.get('/:accountId', require('./GET/fetchAccountProfile'));

router.post('/', require('./POST/createAccount'));
router.post('/login', require('./POST/loginAccount'));
router.post('/:accountId', require('./POST/recoverAccount'));
router.post('/:accountId/active', require('./POST/activeAccount'));

router.put('/:accountId', require('./PUT/updateAccount'));

router.delete('/logout', require('./DEL/logoutAccount'));
router.delete('/:accountId', require('./DEL/destroyAccount'));
router.delete('/:accountId/block', require('./DEL/blockAccount'));

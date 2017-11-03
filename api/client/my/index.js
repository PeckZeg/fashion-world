const router = module.exports = require('express').Router();

router.get('/', require('./get/fetchMyProfile'));

router.post('/login', require('./post/login'));

router.delete('/logout', require('./del/logout'));

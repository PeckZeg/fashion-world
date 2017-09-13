const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchMyProfile'));

router.post('/avatar', require('./POST/uploadMyAvatar'));

router.put('/', require('./PUT/updateMyProfile'));

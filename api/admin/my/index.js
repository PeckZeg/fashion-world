const injectRoutes = require('utils/router/injectRoutes');
const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchMyProfile'));

// router.put('/avatar', require('./put/updateMyAvatar'));
// router.put('/', require('./put/updateMyProfile'));


injectRoutes(router, __dirname);

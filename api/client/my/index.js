const router = module.exports = require('express').Router();

// router.get('/', require('./get/fetchMyProfile'));
// router.get('/upload-avatar-token', require('./get/uploadAvatarToken'));
//
// router.post('/login', require('./post/login'));
//
// router.put('/', require('./put/updateMyProfile'));
//
// router.delete('/logout', require('./del/logout'));

require('utils/router/injectRoutes')(router, __dirname);

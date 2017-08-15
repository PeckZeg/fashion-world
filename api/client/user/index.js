const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-user-list'));
router.get('/personal', require('./get.personal-profile'));
router.get('/personal/favourite-videos', require('./GET.fetchPersonalFavouriteVideoList'));
router.get('/personal/collected-videos', require('./GET.fetchPersonalCollectedVideoList'));
router.get('/:userId', require('./get.fetch-user-profile'));

router.post('/', require('./post.create-user'));
router.post('/login', require('./post.login'));
router.post('/refresh-keys', require('./post.refresh-keys'));
router.post('/code', require('./post.create-verify-code'));
router.post('/validate-code', require('./post.validate-code'));
router.post('/reset-code', require('./post.create-reset-password-verify-code'));
router.post('/validate-reset-code', require('./post.validate-reset-password-code'));

router.put('/reset-password', require('./put.reset-password'));
router.put('/personal', require('./PUT.updatePersonalProfile'));

router.delete('/logout', require('./delete.logout'));
router.delete('/personal/collected-videos', require('./DEL.destroyPersonalCollectedVideos'));
router.delete('/personal/favourite-videos', require('./DEL.destroyPersonalFavouriteVideos'));

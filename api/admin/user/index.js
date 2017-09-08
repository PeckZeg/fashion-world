const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchUserList'));
router.get('/:userId', require('./GET/fetchUserProfile'));

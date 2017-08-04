const router = module.exports = require('express').Router();

router.get('/', require('./GET.fetchBannerList'));

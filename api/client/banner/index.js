const router = module.exports = require('express').Router();

router.get('/', require('./get.fetch-banner-list'));

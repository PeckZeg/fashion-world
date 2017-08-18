const router = module.exports = require('express').Router();

router.get('/', require('./GET/fetchContactList'));

router.put('/', require('./PUT/updateContact'));

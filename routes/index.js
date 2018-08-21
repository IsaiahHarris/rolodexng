const express = require('express');
const router = express.Router();
const contacts = require('./contacts');
const users = require('./users');



router.use('/contacts', contacts);
router.use('/users', users);

module.exports = router;
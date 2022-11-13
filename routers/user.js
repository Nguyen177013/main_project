const express = require('express');
const router = express.Router();
const Account = require('../controllers/user');
router.get('/:id',Account.getUser);
module.exports = router;
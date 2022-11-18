const express = require('express');
const router = express.Router();
const message = require('../controllers/userMessage');
router.get('/',message.message_get);
router.get('/:id',message.sendmessage_get);
module.exports = router;
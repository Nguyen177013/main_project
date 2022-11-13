const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
router.post('/add',commentController.addComment);
module.exports = router;
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
router.get('/login',user.login_get);

router.get('/register',user.register_get);
router.post('/register',user.register_post);
router.get('/forgot-password', user.forgot_get);
router.post('/forgot-password', user.forgot_post);
router.get('/reset-password/:_id/:token', user.reset_get);
router.post('/reset-password/:_id/:token', user.reset_post);
module.exports = router;

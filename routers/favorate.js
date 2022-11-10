const express = require('express');
const router = express.Router();
const favorate = require('../controllers/favorate');
const {requireAuth} = require('../middleware/authorization');
router.post('/add',requireAuth,favorate.addFavorate);
module.exports  = router;
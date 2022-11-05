const express = require('express');
const router = express.Router();
const artist = require('../controllers/artist');
router.get('/:id',artist.getArtist);

module.exports  = router;
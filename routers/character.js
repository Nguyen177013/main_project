const express = require('express');
const router = express.Router();
const character = require('../controllers/character');

router.get('/:id',character.Character_get);

module.exports  = router;
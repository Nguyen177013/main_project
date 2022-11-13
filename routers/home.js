const express = require('express');
const router = express.Router();
const context = require('../controllers/figures')
const {addView} = require('../middleware/viewCount');
router.get('/',context.index);
router.get('/find',context.findFigure);
router.get('/items',context.itemFigure);
router.post('/nav',context.findNav);
// Get particular item
router.get('/:id',addView,context.figure_detail);
module.exports = router;
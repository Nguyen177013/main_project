const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const path = require('path');

class FigureController{
    async index (req,res){
        const figure = await Figure.find().populate('category').populate('artists').populate('character');
        res.render('Home/index',{figures:figure});
    }
    async figure_detail(req,res){
        const fig_id = req.params.id;
        const figure = await Figure.findById(fig_id).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        res.render('Home/detail',{title:"detail",figure:figure});
    }
}

module.exports = new FigureController;
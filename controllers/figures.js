const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const Views = require('../models/userView');
const Favorate = require('./favorate');
const path = require('path');
class FigureController{
    async index (req,res){
        const latest = await Figure.find().populate('category').populate('artists').populate('character').sort({timestamp : -1 }).limit(6);
        const thisMonth = await Figure.find().populate('category').populate('artists').populate('character').sort({timestamp : -1 }).limit(6);
        console.log(new Date(thisMonth[0].release_date[0]));
        res.render('Home/index',{figures:latest,thisMonth:thisMonth});
    }
    async figure_detail(req,res){
        const fig_id = req.params.id;
        const figure = Figure.findById(fig_id).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        const views =  Views.find({figure:fig_id}).count();
        const favorate = Favorate.totalFavorate(fig_id);
        const [a,b,c] = await Promise.all([figure,views,favorate]);
        res.render('Home/detail',{title:"detail",figure:a,views:b,favorate:c});
    }
    async itemFigure(req,res){
        const figure = await Figure.find();
        res.render('Figure/items',{figures: figure,status:'fire'});
    }
    async findFigure(req,res){
        let searchName = req.query.name;
        const figure = await Figure.find({name:{'$regex':searchName,$options: 'is'}});
        console.log('this is figure: ',figure);
        res.render('Figure/find',{name:searchName,figures:figure});
    }
}

module.exports = new FigureController;
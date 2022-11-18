const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const Views = require('../models/userView');
const Comment = require('../controllers/comment');
const Favorate = require('./favorate');
const moment = require("moment");
class FigureController{
    async index (req,res){
        const latest = Figure.find().populate('category').populate('artists').populate('character').sort({_id: -1}).limit(6);
        let [late,topView] = await Promise.all([latest,Views.sortView()]);
        // console.log(topView[0]);
        res.render('Home/index',{figures:late,views:topView});
    }
    async figure_detail(req,res){
        const fig_id = req.params.id;
        const figure = Figure.findById(fig_id).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        const views =  Views.find({figure:fig_id}).count();
        const favorate = Favorate.totalFavorate(fig_id);
        let comments = Comment.getAllComment(fig_id);
        const [a,b,c,d] = await Promise.all([figure,views,favorate,comments]);
        res.render('Home/detail',{title:"detail",figure:a,views:b,favorate:c,comments:d,moment:moment});
    }
    async itemFigure(req,res){
        const figure = await Figure.find();
        res.render('Figure/items',{figures: figure,status:'fire'});
    }
    async findFigure(req,res){
        let searchName = req.query.name;
        const figure = await Figure.find({name:{'$regex':searchName,$options: 'is'}});
        res.render('Figure/find',{name:searchName,figures:figure});
    }
    async findNav(req,res){
        try{
            let searchName = req.body.name;
            console.log(searchName);
            if(searchName){
                const figure = await Figure.find({name:{'$regex':searchName,$options: 'is'}}).populate('origin');
            console.log(figure);
            res.json({figures:figure});
        }
        else
        res.json({figures:''});
    }
    catch(e){
        console.log(e.message);
    }
    }
}

module.exports = new FigureController;
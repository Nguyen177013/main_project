const Figure = require('../models/Figure');
const postFavorate = require('../models/postFavorate');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const Views = require('../models/userView');
const Comment = require('../controllers/comment');
const Favorate = require('./favorate');
const thisDate = new Date();
class FigureController{
    async index (req,res){
        let thisMonth = thisDate.getMonth()+1;
        let thisYear = thisDate.getFullYear();
        const latest = Figure.find().populate('category').populate('artists').populate('character').sort({_id: -1}).limit(6);
        let [late,topView,month] = await Promise.all([latest,Views.sortView(),Figure.getByMonth(thisMonth,thisYear)]);
        res.render('Home/index',{figures:late,months:month,views:topView});
    }
    async latest_fig(req,res){
        const figPerPage = 5
        const length = await Figure.find().count();
        const page = req.params.p-1;
        const latest = await Figure.find().populate('category').populate('artists').populate('character')
        .sort({_id: -1}).skip(figPerPage * page).limit(figPerPage);
        res.render('Figure/latest',{length,page,latest:latest});
    }
    async figure_detail(req,res){
        const fig_id = req.params.id;
        let userId = res?.locals?.user?.id;
        const figure = Figure.findById(fig_id).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        const views =  Views.find({figure:fig_id}).count();
        const total = Favorate.totalFavorate(fig_id);
        let comments = Comment.getAllComment(fig_id);
        let check = Favorate.checkUser(userId,fig_id);
        let favorate = postFavorate.totalFavorate();
        const [a,b,c,d,e,f] = await Promise.all([figure,views,total,comments,check,favorate]);
        let displayPost =[];
        f.filter(value=>{
            value.figure.filter(fig=>{
                if(JSON.stringify(fig.character[0]).includes(fig_id))
                displayPost.push({image:fig.images[0].url,postId:fig._id});
            })
        });
        res.render('Home/detail',{title:"detail",figure:a,views:b,favorate:c,comments:d,check:e,displayPost});
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
            if(searchName){
                const figure = await Figure.find({name:{'$regex':searchName,$options: 'is'}}).populate('origin');
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
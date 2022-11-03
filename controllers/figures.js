const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins')
const path = require('path');
const multer  = require('multer');
const  mongoose = require('mongoose');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, '..','public',"img"))
    },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+path.extname(file.originalname));
    },
});
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 25
    },
}).array('img',20);
class FigureController{

    // hiển thị thông tin index
    async index (req,res){
        const figure = await Figure.find().populate('category').populate('artists').populate('character');
        res.render('body/index',{data:figure,title:"home",user:undefined});
    }
    async figDetail(req, res){
        const figId = req.params.id;
        const data = await Figure.findById(figId).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        res.render('body/detail',{title:"detail",figure:data,user:undefined});
    }

    async editIndex(req,res){
        const figId = req.params.id;
        const artists = await Artist.find();
        const categories = await Categories.find();
        const characters = await Characters.find();
        const companies = await Companies.find();
        const materials = await Materials.find();
        const origins = await Origins.find();
        const data = await Figure.findById(figId).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        res.render('body/edit',{title:"edit",data:{artists,categories,characters,companies,materials,origins},user:undefined,detail:data});
    }
    async createIndex(req,res){
        const artists = await Artist.find();
        const categories = await Categories.find();
        const characters = await Characters.find();
        const companies = await Companies.find();
        const materials = await Materials.find();
        const origins = await Origins.find();
        res.render('body/create',{data:{artists,categories,characters,companies,materials,origins}, title:'create',user:undefined});
    }
    //  Lưu trữ thông tin 
    async addFigure(req,res){
        let dataImg = [];
        try{   
            upload(req,res,async function(err){
            if (err) {
                console.log("lỗi lặt vặt");
                res.status(500).json({error: 'Dung lượng tối đa là 25MB'}); 
            }
            const data = req.body;
            req.files.forEach(file=>{
                dataImg.push(file.filename);
            })
            data['images'] = dataImg;
            let result = await Figure.create(data);
            console.log(result);
            await res.redirect('/');
        })
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    async editFigure(req,res){
        const figId = req.params.id;
        let dataImg = [];
        try{   
            upload(req,res,async function(err){
            if (err) {
                console.log("lỗi lặt vặt");
                res.status(500).json({error: 'Dung lượng tối đa là 25MB'}); 
            }
            const data = req.body;
            req.files.forEach(file=>{
                if(file.filename){
                    console.log('this is filename: ',file.filename);
                    dataImg.push(file.filename);
                    data['images'] = dataImg;
                }
            })
            let result = await Figure.findByIdAndUpdate(figId,data);
            console.log(result);
            await res.redirect('/');
        })
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new FigureController;
const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins')
const path = require('path');
const multer  = require('multer');
const Artists = require('../models/artists');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, '..','public',"img",'mona'))
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


class ComController{

    async indexCom (req,res){
        const companies = await Companies.find().populate('name');
        console.log(companies);
        res.render('body/CompaniesHome',{data:companies,title:"CompaniesHome",user:undefined});
    }
    async comDetail(req, res){
        const comId = req.params.id;
        const data = await Companies.findById(comId).populate('name')
        .populate('Homepage');
        res.render('body/CompaniesDetail',{title:"CompaniesDetail",companies:data,user:undefined});
    }
    async comIndexCreate(req,res){
        res.render('body/createCom',{title:'createCom',user:undefined})
    }
    async addCom(req,res){
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
            let result = await Companies.create(data);
            console.log(result);
            await res.redirect('/');
        })
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
    module.exports = new ComController;
















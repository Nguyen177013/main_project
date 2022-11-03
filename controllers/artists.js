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


class ArtController{

    async indexArt (req,res){
        const artists = await Artists.find().populate('name');
        console.log(artists);
        res.render('body/artistsHome',{data:artists,title:"artistsHome",user:undefined});
    }
    async artDetail(req, res){
        const artId = req.params.id;
        const data = await Artists.findById(artId).populate('name')
        .populate('Homepage');
        res.render('body/artistsDetail',{title:"artistsDetail",artists:data,user:undefined});
    }
    async artIndexCreate(req,res){
        res.render('body/createArt',{title:'createArt',user:undefined})
    }
    async addArt(req,res){
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
            let result = await Artists.create(data);
            console.log(result);
            await res.redirect('/');
        })
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
    module.exports = new ArtController;
















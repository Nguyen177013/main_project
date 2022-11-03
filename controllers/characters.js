const Characters = require('../models/Characters');
const Origins = require('../models/Origins');
const multer  = require('multer');
const path = require('path');
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
    class CharactersController{
        async indexChar (req,res){
            const characters = await Characters.find().populate('name');
            console.log(characters);
            res.render('body/charactersHome',{data:characters,title:"charactersHome",user:undefined});
        }
        async charDetail(req, res){
            const charId = req.params.id;
            const data = await Characters.findById(charId).populate('name')
            .populate('original');
            res.render('body/charactersDetail',{title:"charactersDetail",characters:data,user:undefined});
        }
        async createCharIndex(req,res){
            const origins = await Origins.find();
            res.render('body/createChar',{data:{origins}, title:'createChar',user:undefined});
        }
        
        async addChar(req,res){
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
                let result = await Characters.create(data);
                console.log(result);
                await res.redirect('/');
            })
            }
            catch(ex){
                console.log(ex.message);
            }
        }
    }
module.exports = new CharactersController
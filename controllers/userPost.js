const Account = require('../models/account');
const Post = require('../models/socialMedia');
const Character = require('../models/Characters');
const cloudinary = require('./cloudinary');
const moment = require("moment");
class postController{
    async index(req,res){
        let [charData, posts] = await Promise.all([Character.find(),Post.find().populate('user').sort({_id: -1})]);
        res.render('SocialMedia/index',{characters:charData,posts:posts,moment:moment});
    }
    async post(req,res){
        let {body,img,origin,Character} = req.body;
        let dataImg = [];
        try{
            let userId =req.data.id
            let data = {user:userId,origin:origin,character:Character,title:body};
            for(let ele of req.files){
                const result = await cloudinary.v2.uploader.upload(ele.path,{folder: `/User_Figures/${userId}`});
                dataImg.push({url:result.secure_url,id:result.public_id});
            }
            if(dataImg.length>0)
                data['images'] = dataImg;
                let result = await Post.create(data);
                res.redirect('/figure-wiki');
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new postController;
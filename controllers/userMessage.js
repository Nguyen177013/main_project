const Account = require('../models/account');
const Post = require('../models/socialMedia');
const Character = require('../models/Characters');
const cloudinary = require('./cloudinary');
const message = require('../models/message');
const moment = require("moment");
class messageController{
    async message_get(req,res){  
        let users = await Account.find();
        res.render('SocialMedia/message',{users:users});
    }
    async sendmessage_get(req,res){  
        let userId = req.params.id;
        let userlist = await Account.find();
        let currUser = await Account.findById(userId)
        res.render('SocialMedia/messageb',{users:userlist,userChat:currUser});
    }
}
module.exports = new messageController;
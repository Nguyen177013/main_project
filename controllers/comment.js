const Comment = require('../models/commentFig');
const mongoose = require('mongoose');
const account = require('../models/account');
const handleError = require('../middleware/handleError');
class commentController{
    async getAllComment(figId){
        try{
            let cmts = await Comment.find({figure:figId}).populate('user').sort({_id: -1});
            return cmts
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    async addComment(req,res){
        try{
            const {user,figure,title} = req.body;
            console.log({user,figure,title});
            let commentData = await Comment.create({user,figure,title});
            let data = await Comment.findById(commentData._id).populate('user')
            res.json({cmt:data});
        }
        catch(ex){
            let err = handleError(ex);
            console.log(err.message);
            res.json({err});
        }
    }
}
module.exports = new commentController;
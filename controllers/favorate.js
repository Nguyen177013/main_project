const Favorate = require('../models/favorate');
const mongoose = require('mongoose');
class favorateController{
    async totalFavorate(id){
        let figureId = id;  
        return await Favorate.find({figure:id}).count();
    }
    async getFavorate(id){
        let figureId = id;
        
        return await Favorate.find({figure:id});
    }
    async checkUser(userId,figId){
        let user = userId;
        let fig = figId;
        console.log({user,fig});
        return await Favorate.findOne({user:mongoose.Types.ObjectId(user),figure:mongoose.Types.ObjectId(fig)});
    }
    async addFavorate(req,res){
        let {figId,user} = req.body;  
            let check = await Favorate.find({$and:[{user:user},{figure:figId}]});
            if(check.length<1){
                await Favorate.create({user:user,figure:figId});
                res.json({add:1});
            }
            else{
                await Favorate.deleteOne({user:user,figure:figId})
                res.json({remove:1});
            }
        }
}
module.exports = new favorateController;
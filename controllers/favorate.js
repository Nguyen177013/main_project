const Favorate = require('../models/favorate');

class favorateController{
    async totalFavorate(id){
        let figureId = id;  
        return await Favorate.find({figure:id}).count();
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
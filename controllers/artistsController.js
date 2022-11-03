const Artists = require('../models/artists');

class ArtistsController{
    async index(req,res,next){
        const data = await Artists.find();
        res.json(data);
    }
    async addArtsit(req,res,next){
        try{
            const body = req.body;
            const adding  = await Artists.create(body);
            const data = await Artists.find();
            res.json(data);
        }
        catch(e){
            console.log(e.errors.name.properties.message);
        }
    }

}
module.exports = new ArtistsController;
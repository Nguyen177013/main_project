const character = require('../models/Characters');
const figure = require('../models/Figure');
const origins = require('../models/Origins')
const company = require('../models/Companys');
const mongoose = require('mongoose');
const companyController = require('../controllers/company')
class characterController{
    async Character_get(req,res){
        const charId = req.params.id;
        const detail = await character.findById(charId);
        const figure_data = await figure.find({character:mongoose.Types.ObjectId(charId)}).populate('origin').populate('company');
        let result = [];
        for(let ele of figure_data){
            companyController.containCompanies(ele.company,result);
        }
        res.render('Character/detail',{character:detail,figures:figure_data,company:result});
    }
    async getAllChars(){
        const data = await character.find();
        return data;
    }
}
module.exports = new characterController;
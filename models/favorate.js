const mongoose = require('mongoose');
const favorate = new mongoose.Schema({
    figure:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
    }
});
const materialSchema  =  mongoose.model('materials', material);
module.exports = materialSchema;
const mongoose = require('mongoose');
const material = new mongoose.Schema({
    name:String
});
const materialSchema  =  mongoose.model('materials', material);
module.exports = materialSchema;
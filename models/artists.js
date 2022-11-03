const mongoose = require('mongoose');
const artistsSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        minLength:[6,"vui long nhap > 6"],
    },
    Homepage:String
});
const Artists = mongoose.model('artists',artistsSchema);
module.exports = Artists;

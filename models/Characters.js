const mongoose = require('mongoose');
const character = mongoose.Schema({
    name:String,
    original:String,
    image:String
})
const characterSchema = mongoose.model('characters',character);
module.exports = characterSchema;
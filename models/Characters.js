const mongoose = require('mongoose');
const character = mongoose.Schema({
    name:String,
    original:String,
    expireAt: {
        type: Date,  
        default:  new Date(new Date().valueOf()),
        expires: 10
      }
    // images:{
    //     type:[String],
    // },
})
const characterSchema = mongoose.model('characters',character);
module.exports = characterSchema;
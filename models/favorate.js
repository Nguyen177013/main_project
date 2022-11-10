const mongoose = require('mongoose');
const favorate = new mongoose.Schema({
    figure:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'figures'
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'accounts'
    },
    dayfollow:{
        type: Date,
        default:Date.now
    }
});
const favorateSchema  =  mongoose.model('favorate', favorate);
module.exports = favorateSchema;
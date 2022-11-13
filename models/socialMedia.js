const mongoose = require('mongoose');
const mediaPostsSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    dayPost:{
        type:Date,
        default:Date.now
    },
    images:[{
        id:String,
        url:String
    }],
    title:String,
    origin:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"origins"
    },
    character:{
        type:[mongoose.SchemaTypes.ObjectId],
        required:true,
        ref:"characters"
    },
});
const mediaPosts  =  mongoose.model('userPost', mediaPostsSchema);
module.exports = mediaPosts;
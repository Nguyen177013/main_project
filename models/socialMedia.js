const mongoose = require('mongoose');
const cloudinary = require('../controllers/cloudinary');
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

mediaPostsSchema.post('remove', async function () {
    console.log('success removed');
    this.images.forEach(async image=>{
        console.log(image);
        await cloudinary.uploader.destroy(image.id);
    })
})
const mediaPosts  =  mongoose.model('userPost', mediaPostsSchema);
module.exports = mediaPosts;
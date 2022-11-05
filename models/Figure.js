const mongoose = require('mongoose');
const figure = new mongoose.Schema({
    name:String,
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"categories"
    },
    images:{
        type:[String],
    },
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
    company:{
        type:[mongoose.SchemaTypes.ObjectId],
        required:true,
        ref:"companies"
    },
    artists:{
        type:[mongoose.SchemaTypes.ObjectId],
        required:true,
        ref:"artists"
    },
    materials:{
        type:[String],
        required:true,
        ref:"materials"
    },
    release_date:{
        type: [String],
        default: Date.now
    }
});
const Figure = mongoose.model('figures',figure);
module.exports = Figure;

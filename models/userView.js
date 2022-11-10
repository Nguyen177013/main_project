const mongoose = require('mongoose');
const viewSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'accounts'
    },
    figure:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'figures'
    }
});
const viewer = mongoose.model('user_view',viewSchema);
module.exports = viewer;
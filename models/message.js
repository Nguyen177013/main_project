const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    userSend:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'accounts'
    },
    userGet:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'accounts'
    },
    message:String,
    daySend:{
        type:Date,
        default:Date.now
    }
});
const message  =  mongoose.model('message', messageSchema);
module.exports = message;
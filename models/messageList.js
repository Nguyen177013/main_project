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
});
const message  =  mongoose.model('messageList', messageSchema);
module.exports = message;
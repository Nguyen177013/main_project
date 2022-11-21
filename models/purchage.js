const mongoose = require('mongoose');
const purchageSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'accounts'
    },
    price:{
        type:String,
        default: '10'
    },
    expireAt: {type: Date, default: (Date.now()+7776000000)}
});
purchageSchema.index({ expireAt: 1 }, {  expireAfterSeconds: 0  });
const purchage  =  mongoose.model('purchage', purchageSchema);
module.exports = purchage;
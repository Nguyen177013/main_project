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
    },
    viewFig:{
        type:Date,
        default:Date.now
    }
});
viewSchema.statics.sortView = async function(){
    const list_user = this.aggregate([
        {
          '$group': {
            '_id': '$figure', 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'count': -1
          }
        }, {
          '$addFields': {
            'figure': {
              '$toString': '$_id'
            }
          }
        }, {
          '$lookup': {
            'from': 'figures', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'figure'
          }
        }
      ])
   return list_user;
}
const viewer = mongoose.model('user_view',viewSchema);
module.exports = viewer;
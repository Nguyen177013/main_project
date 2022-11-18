const mongoose = require('mongoose');
const figureSchema = new mongoose.Schema({
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
    price:String,
    release_date:{
        type: Date,
        default: Date.now
    }
});
figureSchema.statics.getByMonth = function(month,year){
    const list_month = this.aggregate([  {
        '$project': {
          'name': 1, 
          'images':1,
          'month': {
            '$month': '$release_date'
          }, 
          'year': {
            '$year': '$release_date'
          }
        }
      }, {
        '$match': {
          'month': month, 
          'year': year
        }
      }]);
      return list_month;
}
const Figure = mongoose.model('figures',figureSchema);
module.exports = Figure;

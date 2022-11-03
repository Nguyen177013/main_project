const mongoose = require('mongoose');
const company = new mongoose.Schema({
    name:String,
    Homepage:String
});
const companySchema = mongoose.model('companies',company);
module.exports = companySchema;
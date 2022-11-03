const mongoose = require('mongoose');
const company = new mongoose.Schema({
    name:String,
    orgName:String,
    homepage:String
});
const companySchema = mongoose.model('companies',company);
module.exports = companySchema;
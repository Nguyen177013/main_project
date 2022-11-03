const mongoose = require('mongoose');
async function connectMongo(url){
    await mongoose.connect(url,(err)=>{
        if(err){
            console.log("khong the ket noi db");
        }
        else{
            console.log("ket noi db thanh cong!");
        }
    })
}
module.exports = connectMongo;
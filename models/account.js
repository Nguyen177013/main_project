const mongoose = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username:{
        type:String,
        required:true,
        minlength: [3,'please enter a valid password']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate:[isEmail,'please enter a valid email'],
    },
    password:{
        type:String,
        required:true,
        minlength: [3,'please enter a valid password']
    },
    image:{
            id:String,
            img_url:String
    }
});
AccountSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel

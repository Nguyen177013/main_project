const mongoose = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username:{
        type:String,
        required:[true,'username'],
        minlength: [3,'valid user name'],
        unique: true
    },
    email: {
        type: String,
        required: [true,'email'],
        lowercase: true,
        unique: true,
        validate:[isEmail,'valid email'],
    },
    password:{
        type:String,
        required:[true,'password'],
        minlength: [3,'valid password']
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
AccountSchema.statics.login = function(username, password) {
    let data = this.findOne({
        username: username,
    }).then(async data => {
        if(data){
            const checkPassword = await bcrypt.compare(password,data.password)
            if (checkPassword) {
                return data;
            }
            else
            throw Error('Password');
        }
        else
        throw Error('User');
    })
    return data;
}

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel

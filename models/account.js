const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/account');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema({
    username: String,
    email: String,
    password: String


}, {
    collection: 'account'
});
AccountSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel

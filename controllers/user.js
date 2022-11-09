const Account = require('../models/account');
const handleError = require('../middleware/handleError');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ id }, 'Hutech', { expiresIn: maxAge })
}
const maxAge = 3 * 24 * 60 * 60;  // 3 ngày
class userController {
    login_get(req, res) {
        res.render('Login/login')
    }
    register_get(rep, res) {
        res.render('Login/register')
    }
    async login_post(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        try {
            const user = await Account.login(username, password);
            const token = createToken(user._id);
            console.log(user);
            console.log('this is token', token);
            res.cookie('user', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ user: user.username });
        }
        catch (ex) {
            let err = handleError(ex);
            res.status(401).json({ err });
        }
    }
    async register_post(req, res) {
        try {
            let data = req.body;
            const user = await Account.create(data);
            res.status(201).json({ user: user._id });
        }
        catch (ex) {
            let err = handleError(ex);
            res.status(401).json({ err });
        }
    }
    forgot_get(req, res) { res.render('Login/forgot-password') };

    async forgot_post(req, res) {
        const { email } = req.body
        const { password } = req.body
        //res.send(email)
        let UserEmail = await AccountModel.findOne({ email })
        let UserID = await AccountModel.findById('6367ca98d840d1daec4ab049')

        let Userpass = AccountModel.findOne(password)
        if (!UserEmail) {
            res.send('User not registered')
            return;
        }
        const secret = JWT_SECRET + Userpass.password
        const payload = {
            email: UserEmail.email,
            _id: UserID._id
        }
        const token = jwt.sign(payload, secret, { expiresIn: '5m' })
        const link = `http://localhost:3000/signup/reset-password/${UserID._id}/${token}`
        console.log(link);
        res.send('Mã reset mật khẩu đã được gửi vào email...')
    }
    async logOut(req,res){
        res.cookie('user','',{httpOnly:true,maxAge:1});
        res.redirect('/');
    }
}
module.exports = new userController;
